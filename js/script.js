'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#templates-tagCloud-Link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#templates-author-Link').innerHTML),
}

const titleClickHandler = function (event) {
  const clickedElement = this
  console.log('Link was clicked!');
  event.preventDefault();

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active')

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const href = clickedElement.getAttribute('href')

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(href)

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active')
}

const generateTitleLinks = function (customSelector = '') {

  /* remove contents of titleList */
  const titles = document.querySelector('.titles');
  titles.innerHTML = ''

  /* for each article */
  const articles = document.querySelectorAll('.post' + customSelector);
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector('.post-title').innerHTML;

    /* create HTML of the link */
    //const html = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    titles.innerHTML = titles.innerHTML + html
  }
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks()

const optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

/* Start calculateTagsParams function*/
const calculateTagsParams = function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  console.log(params);
  return params;
};

const calculateTagClass = function (count, params) {
  //miejsce na napisanie funkcji
  const normalizedCount = count - params.min; //3
  const normalizedMax = params.max - params.min; // 8
  const percentage = normalizedCount / normalizedMax; //0,375
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1); //2

  return optCloudClassPrefix + classNumber;
};


function generateTags() {

  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll('.post');

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector('.post-tags .list');

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags')

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      //html += '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      /* check if this link is NOT already in allAuthors */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
/* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.list.tags');
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)

  /* [NEW] create variable for all links HTML code */
  //let allTagsHTML = '';
   /*zmiana zmiennej na stałą na potrzeby Handlebars */
   const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')</a></li>';
    
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  //tagList.innerHTML = allTagsHTML;

   /*[NEW] add HTML from allTagsHTML to tagList with Handlebars */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ''); //#tag-cat -> cat

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tag of activeTagLinks) {
    /* remove class active */
    tag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active')
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();


function generateAuthors() {

 /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {}; 
  /* find all articles */
  const articles = document.querySelectorAll('.post');
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find Authors wrapper */
    const authorsWrapper = article.querySelector('.post-author');
    /* make html variable with empty string  (nie potrzebne?????????)*/
    let html = '';
    /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');
    /* generate HTML of the link */
    //html += '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
    const authorHTML = {id: articleAuthor, title: articleAuthor};
    
    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = html;
    /* check if this link is NOT already in allAuthors */
    if (!allAuthors[articleAuthor]) {
      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }
  /*find list of authors in right column */
  const authorsList = document.querySelector('.list.authors');
  //const tagsParams = calculateTagsParams(allTags);
  //console.log('tagsParams:', tagsParams)
  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '(' + allAuthors[author] + ')</a></li>';
  /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  authorsList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
  /* make a new constant "tag" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for (let link of activeAuthorLinks) {
    /* remove class active */
    link.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const relatedAuthors = document.querySelectorAll('a[href="' + href + '"]')
  /* START LOOP: for each found tag link */
  for (let link of relatedAuthors) {
    /* add class active */
    link.classList.add('active')
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors() {
  /* find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');
  for (let link of links) {
    /* add authorClickHandler as event listener for that link */
    link.addEventListener("click", authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();


