const removeBannerModule = function() {

    const removeButton = document.querySelector('.cataloge__remove-banner-button');
    const banner = document.querySelector('.cataloge__banner');

    removeButton.addEventListener('click', () => {
        banner.classList.add('hide'); 
        removeButton.style.display = 'none';
    });
};

const showFiltersResultModule = function() {

    const filtersButtonsContainer = document.querySelector('.cataloge__filters-buttons');
    const filterButtons = document.querySelectorAll('.cataloge__filters-button');
    const filterResults = document.querySelectorAll('.cataloge__filters-result');


    filterButtons.forEach(el => {
        
        el.addEventListener('click', (e) => {

            const buttonDataAttribute = el.getAttribute('data-filter-button');

            filterButtons.forEach(el => {
                el.classList.remove('active');
            });

            el.classList.add('active');

            filterResults.forEach(el => {

                const contentDataAttribute = el.getAttribute('data-filter-result')

                el.classList.remove('active');

                if (buttonDataAttribute == contentDataAttribute) {
                    el.classList.add('active');
                };
            });

            if (el.getAttribute('data-filter-button') === 'brand') {
                filtersButtonsContainer.classList.add('hide');
            };

        });
    });
};

const categoriesAccordionModule = function () {
    const accordionContainer = document.querySelector('.cataloge-categories__accordion-container');
    const maxStage = 3;

    accordionContainer.addEventListener('click', (e) => {
        const target = e.target;
        const trigger = target.closest('.categories-sub-accordion__trigger');

        if (trigger) {
            const parent = trigger.parentNode;
            const nextElement = trigger.nextElementSibling;
            const dataAttr = parent.dataset.nesting;
            const currentStage = +dataAttr[dataAttr.length - 1];
            const items = document.querySelectorAll(`[data-nesting=${dataAttr}]`);
            const prevTrigger = parent.parentNode.previousElementSibling;

            if (currentStage > 0 && prevTrigger) {
                prevTrigger.classList.add('return');
            }

            if (trigger.classList.contains('active') && nextElement) {
                const triggers = parent.querySelectorAll('.categories-sub-accordion__trigger.return');
                triggers.forEach((trigger) => {
                    trigger.classList.remove('return');
                });

                if (prevTrigger) {
                    prevTrigger.classList.remove('return');
                }

                for (let i = currentStage + 1; i <= maxStage; i++) {
                    const nextDataAttr = dataAttr.slice(0, -1) + i;
                    const prevItems = nextElement.querySelectorAll(`[data-nesting=${nextDataAttr}]`);
                    prevItems.forEach(item => {
                        item.classList.remove('hide');
                    });
                }

                const prevTriggers = nextElement.querySelectorAll('.categories-sub-accordion__trigger .active');
                const prevAccordions = nextElement.querySelectorAll('.categories-sub-accordion .active');
                [prevTriggers, prevAccordions].forEach(items => {
                    items.forEach(item => {
                        item.classList.remove('active');
                    });
                });
            }

            if (trigger.nextElementSibling) {
                nextElement.classList.toggle('active');
            }

            items.forEach(item => {
                item.classList.toggle('hide');
            });

            parent.classList.remove('hide');
            trigger.classList.toggle('active');
        }
    });
};

const showCategoriesModule = function() {

    const triggers = document.querySelectorAll('.cataloge-categories__type');
    const items = document.querySelectorAll('.cataloge-categories__content-item');


    triggers.forEach(el => {

        el.addEventListener('click', (e) => {

            e.preventDefault();

            const dataAttr = el.getAttribute('data-categories-type');
            

            triggers.forEach(el => {
                el.classList.remove('active');
            });

            el.classList.add('active');

            items.forEach(el => {
                
                const itemDataAttr = el.getAttribute('data-content-type');

                el.classList.remove('active');

                if (dataAttr === itemDataAttr) {
                    el.classList.add('active');
                };
            });

        });
    }); 



};

const selectModule = function(obj) {

    const select = document.querySelector(obj.selectClass);
    const selectList = document.querySelector(obj.selectListClass);
    const selectTrigger = document.querySelector(obj.selectTriggerClass);
    const selectTriggerText = selectTrigger.querySelector('.footer__select-trigger-text');

    select.addEventListener('click', (e) => {

        const target = e.target;

        if (target.classList.contains(obj.selectTriggerClass) || target.closest(obj.selectTriggerClass)) {
            selectTrigger.classList.toggle('show');
            selectList.classList.toggle('visible');
        };

        if (target.classList.contains('footer__select-list-item') || target.closest('.footer__select-list-item')) {
            selectTriggerText.textContent = target.textContent;
            selectList.classList.remove('visible');
            selectTrigger.classList.remove('show');
        };
    });
};

const smoothScrollModule = () => {
    const scrollToBtn = document.querySelector('.smooth-scroll');
    const scrollToSection = document.querySelector('#scroll-to-top');

    const scrollTo = (el) => {
        window.scroll({
            left: 0,
            top: el.offsetTop,
            behavior: 'smooth'
        });
    };

    scrollToBtn.addEventListener('click', () => {
        scrollTo(scrollToSection);
    });
}

const footerListsModule = function() {

    const triggers = document.querySelectorAll('.footer__list-title');
    const lists = document.querySelectorAll('.footer__list-items');


    triggers.forEach(el => {
        el.addEventListener('click', (e) => {

            const dataAttr = el.getAttribute('data-list-trigger');

            lists.forEach(el => {

                const listDataAttr = el.getAttribute('data-list');

                if (dataAttr === listDataAttr) {
                    if (el.classList.contains('active')) {
                        el.style.maxHeight = `${0}px`;
                        el.classList.remove('active');
                    } else {
                        el.style.maxHeight = `${el.scrollHeight}px`;
                        el.classList.add('active');
                    };
                };
            });
        });
    });
};

selectModule({
    selectClass: '.footer__select',
    selectListClass: '.footer__select-list',
    selectTriggerClass: '.footer__select-trigger',
});

footerListsModule();
smoothScrollModule();
showCategoriesModule();
categoriesAccordionModule();
showFiltersResultModule();
removeBannerModule();

