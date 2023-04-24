const accordionBtns = document.querySelectorAll(".sf__accordion-button");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    //console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      //console.log(content.style.maxHeight);
    }
  };
});



/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4558:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

class Collection {
  // "paginate" | "loadmore" | "infinite"
  // "storefront_filters" | "tags_filter"
  // "leftColumn" | "rightColumn" | "fixed"
  constructor() {
    _defineProperty(this, "selectors", {
      section: '.facest-filters-section',
      toolbar: '.sf__collection-toolbar',
      cols: ['.sf__gridColumn-view button'],
      productContainer: '[data-product-container]',
      loadMoreBtn: '[data-load-more]',
      // Sidebar filters selectors
      sidebar: '.sf__sidebar',
      sidebarContent: '.sf__sidebar-content',
      openSidebar: '.sf__sidebar-open',
      closeSidebar: '.sf__sidebar-close',
      filtersWrapper: '.sf__filter-wrapper'
    });

    _defineProperty(this, "mobileSortingSelectors", {
      openSorting: '.sf__sortmb-icon',
      closeSorting: '.sf__hidden-sortmb',
      sortingWrapper: '.sf__sortmb-wrapper',
      sortingList: '.sf__sortmb-list'
    });

    _defineProperty(this, "sectionId", void 0);

    _defineProperty(this, "isDesignMode", collection_MinimogSettings.design_mode);

    _defineProperty(this, "currentPage", 1);

    _defineProperty(this, "paginationType", void 0);

    _defineProperty(this, "totalPages", void 0);

    _defineProperty(this, "totalProducts", void 0);

    _defineProperty(this, "infiniteLoadingObserver", void 0);

    _defineProperty(this, "showColSwitchers", void 0);

    _defineProperty(this, "cachedCol", void 0);

    _defineProperty(this, "initialCol", void 0);

    _defineProperty(this, "activeCol", void 0);

    _defineProperty(this, "STORAGE_KEY", 'gridColumnViews');

    _defineProperty(this, "MAX_COL_BY_SCREEN_SIZE", {
      'mobile': 2,
      'tablet': 4,
      'desktop': 5
    });

    _defineProperty(this, "enableFilters", void 0);

    _defineProperty(this, "enableSorting", void 0);

    _defineProperty(this, "filtersType", void 0);

    _defineProperty(this, "filtersPosition", void 0);

    _defineProperty(this, "accordions", void 0);

    _defineProperty(this, "sideEffectEventsAdded", false);

    _defineProperty(this, "init", () => {
      this.domNodes = queryDomNodes(this.selectors);
      this.mbSortingNodes = queryDomNodes(this.mobileSortingSelectors);
      this.setData();

      if (this.productCount) {
        this.initGridView();
        this.initFilters();
        this.initMobileSorting();
        this.initProducts();
      }

      this.sideEffectEventsAdded = true;
      MinimogEvents.subscribe('ON_PRODUCT_LIST_UPDATED', () => refreshProductReview());
    });

    _defineProperty(this, "setData", () => {
      const {
        section,
        productContainer
      } = this.domNodes; // Grid view data

      this.sectionId = section.dataset.sectionId;
      this.paginationType = section.dataset.paginationType;
      this.productCount = Number(section.dataset.productCount);
      this.totalPages = Number(productContainer?.dataset?.totalPages); // TODO: get from URL Search Params

      this.activeCol = null;
      this.currentPage = 1;
      this.initialCol = Number(section.dataset.initialColumn);
      this.cachedCol = Number(window.localStorage.getItem(this.STORAGE_KEY));
      this.showColSwitchers = section.dataset.showColSwitchers === 'true'; // Filters data

      this.enableFilters = section.dataset.enableFilters === 'true';
      this.enableSorting = section.dataset.enableSorting === 'true';
      this.filtersType = section.dataset.filtersType;
      this.filtersPosition = section.dataset.filtersPosition;
    });

    _defineProperty(this, "initGridView", () => {
      initCustomSelect(this.domNodes.section);
      this.toggleView(this.isDesignMode ? this.initialCol : this.cachedCol);
      this.updateViewByScreen();
      (0,events/* addEventDelegate */.X)({
        selector: this.selectors.cols[0],
        context: this.domNodes.toolbar,
        handler: (e, colNode) => this.toggleView(Number(colNode.dataset.column))
      });
      this.initLoadMore();

      if (!this.sideEffectEventsAdded) {
        window.addEventListener('resize', debounce(this.updateViewByScreen, 500));
      }
    });

    _defineProperty(this, "initFilters", () => {
      if (!this.enableFilters) return;
      const {
        sidebar,
        openSidebar,
        closeSidebar
      } = this.domNodes;
      window.requestAnimationFrame(this.initAccordions);
      openSidebar.addEventListener('click', this.openSidebarFilter);
      closeSidebar.addEventListener('click', this.closeSidebarFilter);
      sidebar.addEventListener('click', e => e.target === sidebar && this.closeSidebarFilter());
    });

    _defineProperty(this, "initMobileSorting", () => {
      if (!this.enableSorting) return;
      const {
        openSorting,
        closeSorting,
        sortingWrapper
      } = this.mbSortingNodes;
      openSorting.addEventListener('click', this.openMobileSorting);
      closeSorting.addEventListener('click', this.closeMobileSorting);
      sortingWrapper.addEventListener('click', e => e.target === sortingWrapper && this.closeMobileSorting());
    });

    _defineProperty(this, "openMobileSorting", () => {
      const {
        sortingWrapper,
        sortingList
      } = this.mbSortingNodes;
      sortingWrapper.style.display = 'block';
      window.requestAnimationFrame(() => {
        sortingWrapper.style.setProperty('--tw-bg-opacity', '0.5');
        sortingList.style.setProperty('--tw-translate-y', '0');
      });
    });

    _defineProperty(this, "closeMobileSorting", e => {
      const {
        sortingWrapper,
        sortingList
      } = this.mbSortingNodes;
      sortingWrapper.style.setProperty('--tw-bg-opacity', '0');
      sortingList.style.setProperty('--tw-translate-y', '100%');
      setTimeout(() => sortingWrapper.style.setProperty('display', 'none'), 300);
    });

    _defineProperty(this, "initAccordions", () => {
      this.accordions?.destroy?.();
      const {
        filtersWrapper
      } = this.domNodes;
      filtersWrapper.classList.remove('acc-initialized');
      this.accordions = new Accordion(filtersWrapper, {
        presetContentHeight: window.innerWidth > 1280 && this.filtersPosition !== 'fixed',
        callback: () => filtersWrapper.classList.add('opacity-100')
      });
    });

    _defineProperty(this, "openSidebarFilter", () => {
      const {
        sidebar,
        sidebarContent,
        section
      } = this.domNodes;
      sidebar.style.display = 'block';
      window.requestAnimationFrame(() => {
        sidebar.style.setProperty('--tw-bg-opacity', '0.5');
        sidebarContent.style.setProperty('--tw-translate-x', '0');
        this.accordions?.setContentHeight?.();
      });
      section.classList.add('sidebar-open');
    });

    _defineProperty(this, "closeSidebarFilter", () => {
      const {
        sidebar,
        sidebarContent,
        section
      } = this.domNodes;
      section.classList.remove('sidebar-open');

      if (window.innerWidth < 1280 || sidebar.dataset.type === 'fixed') {
        sidebarContent.style.setProperty('--tw-translate-x', '-100%');
        sidebar.style.removeProperty('--tw-bg-opacity');
        setTimeout(() => sidebar.style.removeProperty('display'), 300);
      }
    });

    _defineProperty(this, "toggleView", col => {
      if (!col) return;
      const {
        cols,
        productContainer
      } = this.domNodes;
      const activeCol = this.activeCol || this.initialCol;

      if (this.showColSwitchers) {
        cols[activeCol - 1].classList.remove('active');
        cols[col - 1].classList.add('active');
      }

      productContainer.classList.remove(`sf__col-${activeCol}`);
      productContainer.classList.add(`sf__col-${col}`);
      window.localStorage.setItem(this.STORAGE_KEY, col);
      this.activeCol = col;
    });

    _defineProperty(this, "updateViewByScreen", () => {
      if (this.activeCol === 1) return; // List layout

      const device = this.getDeviceByScreenSize();
      const maxCol = this.MAX_COL_BY_SCREEN_SIZE[device];
      if (maxCol < this.activeCol) this.toggleView(maxCol);
    });

    _defineProperty(this, "getDeviceByScreenSize", () => {
      if (window.innerWidth < 768) return 'mobile';
      if (window.innerWidth < 1024) return 'tablet';
      return 'desktop';
    });

    _defineProperty(this, "initLoadMore", () => {
      if (this.paginationType === 'paginate' || this.totalPages <= 1) return;
      const {
        loadMoreBtn
      } = this.domNodes;
      loadMoreBtn.addEventListener('click', this.loadMoreProducts);

      if (this.paginationType === 'infinite') {
        this.infiniteLoadingObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio === 1) this.loadMoreProducts();
          });
        }, {
          threshold: 1
        });
        this.infiniteLoadingObserver.observe(loadMoreBtn);
      }
    });

    _defineProperty(this, "loadMoreProducts", () => {
      const nextPage = this.currentPage + 1;
      if (nextPage > this.totalPages) return;
      const {
        productContainer,
        loadMoreBtn
      } = this.domNodes;
      this.toggleLoading(true);
      fetchSection(this.sectionId, {
        fromCache: true,
        params: {
          page: nextPage
        }
      }).then(productGridHTML => {
        const productNodes = productGridHTML.querySelectorAll('[data-product-container] .sf__col-item');
        productNodes.forEach(prodNode => productContainer.firstElementChild.appendChild(prodNode));
        this.initProducts();
      }).catch(err => console.error(`Failed to load more products.`, err)).finally(() => {
        MinimogEvents.emit('ON_PRODUCT_LIST_UPDATED');
        this.toggleLoading(false);
        this.currentPage = nextPage;

        if (nextPage >= this.totalPages) {
          loadMoreBtn.parentNode.remove();
          this.infiniteLoadingObserver?.unobserve?.(loadMoreBtn);
        }
      });
    });

    _defineProperty(this, "initProducts", () => {
      // MinimogTheme
      // .Products
      // .initProductForms({context: this.domNodes.section})
      // .then(() => {})
      // .catch(console.error)
      MinimogTheme.CompareProduct?.setCompareButtonsState?.();
      MinimogTheme.Wishlist?.setWishlistButtonsState?.();
    });

    _defineProperty(this, "toggleLoading", loading => {
      const {
        loadMoreBtn
      } = this.domNodes;

      if (loadMoreBtn) {
        const method = loading ? 'add' : 'remove';
        loadMoreBtn.classList[method]('sf-spinner-loading');
      }
    });
  }

}

MinimogTheme.Collection = new Collection();
}();
/******/ })()
;