// Help Article page only
if (typeof window != 'undefined' && document.querySelector(".sec-2-col-AccordionArticle")) {

    // DOM
    const helpArticleSidenavAccordion = document.querySelector('.sec-2-col-AccordionArticle .accordion-wrapper');
        //   helpArticleContent = document.querySelectorAll('.sec-2-col-AccordionArticle > .row > .column')[1];

    // Variables
    let endpointString = '',
        fetchedData,
        activePage,
        fragmentURL,
        fragmentHTML;

	/** Build a Help Article link.
	*  @param {Object} listItem A JS object containing String properties page-title, page-url, page-route.
	*  @return {String} HTML that can be used to update the article DOM.
	*/
	const generateListColumnSectionLI = listItem => {
        const pageRoute = listItem['page-route'],
              pageTitle = listItem['page-title'],
              fragmentURL = listItem['page-url'];
        let activeClass = (window.location.pathname == pageRoute) ? 'active' : '';
            html = `<li class="list-column-section--title" data-fragment-url="${fragmentURL}">`;

		if (activeClass == 'active') {
			return html + `<p class="${activeClass}" data-fragment-url="${fragmentURL}">${pageTitle}</p></li>`;
		}
		return html + `<a href="${pageRoute}" class="title-heading">${pageTitle}</a></li>`;
    };

	/** Build a category of Help Article links.
	*  @param {Object} listItemArray A JS array of objects containing properties for a category.
	*  @return {String} HTML that can be used to update the article DOM.
	*/
	const generateListColumnSectionUL = listItemArray => {
        let html = `<ul class="list-column-section">`;

		listItemArray.map(listItem => {
            html = html + generateListColumnSectionLI(listItem);
		});
		html = html + '</ul>';
		return html;
    };

	/** Build an accordion containing category heading and Help Article links.
	*  @param {Object} category A JS object with list-title (String) and listItem (Array).
	*  @return {String} HTML that can be used to update the article DOM.
	*/
	const generateAccordion = category => {
        let html = `<div class="accordion">`;
		html = html + '<p class="accordion-header"><a href="#" class="icon-wrapper"><span class="icon-copy">'
            + category['list-title']
            + '</span><span class="icon icon-after icon-chevrondown"></span></a></p>'
			+ generateListColumnSectionUL(category.listItem)
			+ '</div>';
		return html;
    };

    /** Build div.accordion-wrapper containing all categories
	 *  @param {Object} data A JavaScript object parsed from the fetched JSON.
	 *  @return {String} The complete HTML that can be used to update the article DOM.
	 */
	const updateSideNavAccordionContent = data => {
        let html = ``;
        const columns = data.docs,
              keys = Object.keys(columns);

        keys.map(key => {
            const categoriesArray = columns[key];
            for(let i=0; i < categoriesArray.length; i++) {
                html = html.concat(generateAccordion(categoriesArray[i]));
            }
		});
		helpArticleSidenavAccordion.innerHTML = html;
    };

	const retrieveData = async () => {
		await fetch(endpointString)
			.then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then(data => fetchedData = data)
            .catch(error => console.log(error));
    }

    /* TODO: Disable until Help Article components are approved.

	const retrieveFragmentAndUpdateArticle = async () => {
        fragmentURL = activePage.getAttribute('data-fragment-url');
        const frontendOrigin = window.location.origin,
              fragmentFullURL = frontendOrigin.concat(fragmentURL);

        await fetch(fragmentFullURL)
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.text();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then(frag => fragmentHTML = frag)
            .catch(error => console.log(error));
        helpArticleContent.innerHTML = fragmentHTML;
    }
    */

    const addCategoryOpenListener = () => {
        let accordionHeaders = document.getElementsByClassName("accordion-header");
        for (let i = 0; i < accordionHeaders.length; i++) {
            const handleCategoryPress = event => {
                const accordionHeader = event.target.classList.contains('icon-wrapper')
                    ? event.target.parentNode
                    : event.target,
                accordionHeaderIconClasses = accordionHeader.querySelector('.icon-after').classList;

                accordionHeader.classList.toggle("isOpen");
                accordionHeaderIconClasses.toggle('icon-chevrondown');
                accordionHeaderIconClasses.toggle('icon-chevronup');
            };

            accordionHeaders[i].addEventListener("click", event => handleCategoryPress(event));
            accordionHeaders[i].addEventListener('keypress', event => {
                if (event.key === 'Enter') {
                    handleCategoryPress(event);
                }
            });
        }
	}

    // Find accordion of active panel, add isOpen class to expand; add click/enter listeners.
    const openActiveAccordionAndAddListener = () => {
        activePage = helpArticleSidenavAccordion.querySelector(".list-column-section .active");

        const selectedAccordion = activePage.closest('.sec-2-col-AccordionArticle .accordion'),
            selectedHeader = selectedAccordion.querySelector(".accordion-header");
        selectedHeader.classList.add("isOpen");

        // Update icon for active page link.
        let selectedHeaderIconClasses = selectedHeader.querySelector('.icon-after').classList;
        selectedHeaderIconClasses.add('icon-chevronup');
        selectedHeaderIconClasses.remove('icon-chevrondown');

		addCategoryOpenListener();
    }

    const getDataComponentEndpoint = () => {
        endpointString = document.querySelector('.sec-2-col-AccordionArticle').getAttribute('data-component-endpoint');
    }

    window.addEventListener("DOMContentLoaded", async () => {
        getDataComponentEndpoint();
        await retrieveData();
        await updateSideNavAccordionContent(fetchedData);
        openActiveAccordionAndAddListener();

        /* TODO: Disable until Help Article components are approved.

        retrieveFragmentAndUpdateArticle();
        */
    });
}
