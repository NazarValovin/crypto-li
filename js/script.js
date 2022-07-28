
"use strict";


document.addEventListener('DOMContentLoaded', () => {




    // Burger

    function burgerClick() {
        const burger = document.querySelector('.header__burger');
        const btn = document.querySelector('.header__btn');
        const menu = document.querySelector('.header__nav');
        const body = document.body;

        const menuMobile = document.createElement('div');
        menuMobile.classList.add('menu-mobile');

        if (burger) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('_active');
                body.classList.toggle('_active');
                menuMobile.classList.toggle('_active');
            });

            if (document.documentElement.clientWidth <= 900) {
                burger.insertAdjacentElement('afterend', menuMobile);
                menuMobile.insertAdjacentElement('beforeend', menu);
            }

            if (document.documentElement.clientWidth <= 650) {
                menuMobile.insertAdjacentElement('beforeend', btn);
            }
        }
    }

    burgerClick();



    // Open Modal

    function scrollWidthOnPage() {
        let div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        // мы должны вставить элемент в документ, иначе размеры будут равны 0
        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();

        return scrollWidth;
    }

    function openmodal() {
        const btns = document.querySelectorAll('[data-btn]');
        const modal = document.querySelector('.modal');
        const modalClose = document.querySelector('.modal__close');
        const body = document.body;

        if (btns.length > 0) {
            for (let index = 0; index < btns.length; index++) {
                const btn = btns[index];

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    modal.classList.add('_active');
                    body.classList.add('_active');
                    body.style.width = ` ${body.clientWidth - scrollWidthOnPage()}px`;
                });
            }
            modalClose.addEventListener('click', (e) => {
                modal.classList.remove('_active');
                body.classList.remove('_active');
                body.style.width = ``;
            });
        }
    }
    openmodal();



    // Tab

    function hiddenTabAndContent(contents, tabs) {
        for (let index = 0; index < contents.length; index++) {
            const content = contents[index];
            content.classList.remove('_active');
            content.classList.add('_none');
        }
        for (let index = 0; index < tabs.length; index++) {
            const tab = tabs[index];
            tab.classList.remove('_active');
        }
    }

    function contentTabShow(contents, tab) {
        for (let index = 0; index < contents.length; index++) {
            const content = contents[index];

            if (tab.dataset.item === content.dataset.content) {
                content.classList.add('_active');
                content.classList.remove('_none');
                tab.classList.add('_active');
            }
        }
    }

    function clickTab(selectionTabs, selectionContents) {
        const tabs = document.querySelectorAll(selectionTabs);
        const contents = document.querySelectorAll(selectionContents);

        if (tabs.length > 0) {
            hiddenTabAndContent(contents, tabs);
            tabs[0].classList.add('_active');
            contents[0].classList.add('_active');
            contents[0].classList.remove('_none');

            for (let index = 0; index < tabs.length; index++) {
                const tab = tabs[index];

                tab.addEventListener('click', () => {
                    hiddenTabAndContent(contents, tabs);
                    contentTabShow(contents, tab);
                });
            }
        }
    }
    clickTab('.tabs-requirements__item', '.content-requirements__item');
    clickTab('.how-work__tab', '.content-how-work__item');




    //Header Fixed

    function headerFixed() {
        // let lastScroll = 0;
        const defaulScroll = 100;

        const header = document.querySelector('.header');

        const height = header.clientHeight;
        const nextElement = header.nextElementSibling;

        if (header) {
            window.addEventListener('scroll', (e) => {
                // if (document.documentElement.clientWidth >= 900) {
                if (window.pageYOffset >= defaulScroll) {
                    header.classList.add('_fixed');
                    nextElement.style.paddingTop = `${height}px`;

                } else {

                    if (window.pageYOffset >= defaulScroll) {
                        header.classList.add('_fixed');
                        header.classList.remove('_slideDown');
                        header.classList.add('_swingOutX');
                        nextElement.style.paddingTop = `${height}px`;
                    } else {
                        header.classList.remove('_fixed');
                        header.classList.remove('_swingOutX');
                        nextElement.style.paddingTop = ``;
                    }
                }
                // lastScroll = window.pageYOffset;
                // }
            });
        }
    }
    headerFixed();

    //====================================================================


    // Go Top

    function goToLink(selectorElement) {
        const scrollTarget = document.querySelector(selectorElement);
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition;
        window.scrollBy({
            top: offsetPosition,
            behavior: "smooth",
        });
    }

    function srctionGoTo(sectionTo, btn) {
        for (let index = 0; index < sectionTo.length; index++) {
            const element = sectionTo[index];

            if (element.dataset.to === btn.dataset.go) {
                goToLink(`.${btn.dataset.go}`);
            }
        }
    }

    function clickBtnToSection() {
        const btnGo = document.querySelectorAll("[data-go]");
        const sectionTo = document.querySelectorAll("[data-to]");

        if (btnGo.length > 0) {
            for (let index = 0; index < btnGo.length; index++) {
                const element = btnGo[index];
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    srctionGoTo(sectionTo, element);
                });
            }
        }
    }
    clickBtnToSection();



    //Modal jurisdiction

    function clickJurisdiction() {
        const btns = document.querySelectorAll('.jurisdiction__btn');
        const jurisdictionWrapp = document.querySelectorAll('.jurisdiction__wrapp');
        const modalJurisdiction = document.querySelector('.modal-jurisdiction');
        const modalJurisdictionWrapper = document.querySelector('.modal-jurisdiction__wrapper');
        const jurisdictionRequirements = document.querySelectorAll('.jurisdiction__requirements');
        const modalClose = document.querySelector('.modal-jurisdiction__close');
        const body = document.body;

        if (btns.length > 0) {
            for (let index = 0; index < btns.length; index++) {
                const btn = btns[index];

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    modalJurisdictionWrapper.insertAdjacentElement('afterbegin', jurisdictionRequirements[index]);
                    modalJurisdiction.classList.add('_active');
                    body.classList.add('_active');
                    body.style.width = ` ${body.clientWidth - scrollWidthOnPage()}px`;
                });

                modalClose.addEventListener('click', (e) => {
                    modalJurisdiction.classList.remove('_active');
                    body.classList.remove('_active');
                    body.style.width = ``;
                    jurisdictionWrapp[index].insertAdjacentElement('afterend', jurisdictionRequirements[index]);
                });
            }
        }
    }
    clickJurisdiction();











});