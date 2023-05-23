<script>

    (function(){

      function setUpQuickView(button){

        button.addEventListener('click', function(){

          /*

          * For this example the QuickView Button is expected to have following attribiutes 

          * Example:

          * <button data-productId="6777ffff" data-handle="myProdutHandle">Quick view </button>

          *

          */

          const id = button.dataset.productId;

          const handle = button.dataset.handle;

          /* Some themes put each product into its own container when the Pop-up is open

          *  Typically appending productId to the Id of the div which shows QuickView Modal

          *  If your theme does not use the concept of One Div per product and dynamically 

          *  inserts product detials into a Single Div then selector could be simpler wihtout needing

          *  product id

          */

          const productPopUpContainerSelector = `#QuickShopModal-${id}`;

          /*

          *  Themes which use one div per product to show Quicview will also remember the variantId 

          *  this is a helper method to get selected variantId for the quickview product

          * 

          */

          const variant = window.inventoryInfo.api.getSelectedvariant(productPopUpContainerSelector);

          window.inventoryInfo.api.showOnQuickView({

                                                      handle:handle,

                                                      variant:variant

                                                   }, 

                                                   productPopUpContainerSelector);

  

        });

      }

      window.addEventListener("DOMContentLoaded", function() {

        //Get all Quickview buttons on the page and hook up click event

        const quickViewBtns = document.querySelectorAll('.quick-product__btn');

        for(let i=0;i<quickViewBtns.length;i++){

            setUpQuickView(quickViewBtns[i]);

        }

      });

    })();

  </script>