'use strict';
const titleClickHandler = function(event){
    const clickedElement = this
    console.log('Link was clicked!');
    event.preventDefault();
  
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}
    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
clickedElement.classList.add('active')

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post.active');
for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}
    /* get 'href' attribute from the clicked link */
const href = clickedElement.getAttribute('href')

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(href)
  
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active')
  }
  
 





  const generateTitleLinks = function () {

    /* remove contents of titleList */
   const titles = document.querySelector('.titles');
   titles.innerHTML = ''

   /* for each article */
   const articles = document.querySelectorAll('.post')
   for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector('.post-title').innerHTML;

    /* create HTML of the link */
    const html = '<li><a href="#'+articleId+'"><span>'+articleTitle+'</span></a></li>'
   
    /* insert link into titleList */
    titles.innerHTML = titles.innerHTML + html
   }
   const links = document.querySelectorAll('.titles a');

   for(let link of links){
     link.addEventListener('click', titleClickHandler);
   }
  }
  generateTitleLinks()









  optArticleTagsSelector = '.post-tags .list'

  function generateTags(customSelector = ''){
    /* find all articles */
    const articles = document.querySelectorAll('.post' + customSelector);

    /* START LOOP: for every article: */
    for(let article of articles){
  
      /* find tags wrapper */
      const tagsWrapper = article.querySelector('.post-tags .list');
  
      /* make html variable with empty string */
      let html = '';
  
      /* get tags from data-tags attribute */
      const articleTags= article.getAttribute('data-tags')
  
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
  
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
  
        /* generate HTML of the link */
        html += '<li><a href="#tag-'+tag+'"><span>'+tag+'</span></a></li>';

        /* add generated code to html variable */
        
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
  }
  
  generateTags();









  function tagClickHandler(event){
    /* prevent default action for this event */
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    clickedElement = this
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    href =  clickedElement.getAttribute('href')
  
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
  
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]);
    
    /* START LOOP: for each active tag link */
    for(let tag of activeTagLink){
  
      /* remove class active */
      activeTagLink.classList.remove('.active');
}
  
    /* END LOOP: for each active tag link */
}
  
    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefTagLinks = href.getAttribute('href')
  
    /* START LOOP: for each found tag link */
  for(let href of hrefTagLinks){
      /* add class active */
  href.classList.add('active')
    /* END LOOP: for each found tag link */
}
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
 
    






  function addClickListenersToTags(){
    /* find all links to tags */
  const tag = document.querySelectorAll ('links')
    /* START LOOP: for each link */
    for (link of links)
  
      /* add tagClickHandler as event listener for that link */
  link.addEventListener.add.tagClickHandler ()
    /* END LOOP: for each link */
  }
  
  addClickListenersToTags();



  function generateAuthors(){
    /* find all articles */
    const articles = document.querySelectorAll('.post')
    /* START LOOP: for every article: */
    for (let article of articles)
     /* find Authors wrapper */
     const authorsWrapper = article.querySelector('.post-author .list');
     /* make html variable with empty string */
      let html = '';
     /* get tags from data-tags attribute */
      const articleAuthor= article.getAttribute('data-author');
       /* generate HTML of the link */
       html += '<li><a href="#author-'+author+'"><span>'+author+'</span></a></li>';
        /* insert HTML of all the links into the tags wrapper */
      authorsWrapper.innerHTML = html;
  }








  optTagsListSelector = .tags.list


  function generateTags(){
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = [];
  
    /* find all articles */
  
    /* START LOOP: for every article: */
  
      /* find tags wrapper */
  
      /* make html variable with empty string */
  
      /* get tags from data-tags attribute */
  
      /* split tags into array */
  
      /* START LOOP: for each tag */
  
        /* generate HTML of the link */
  
        /* add generated code to html variable */
  
        /* [NEW] check if this link is NOT already in allTags */
        if(allTags.indexOf(linkHTML) == -1){
          /* [NEW] add generated code to allTags array */
          allTags.push(linkHTML);
        }
  
      /* END LOOP: for each tag */
  
      /* insert HTML of all the links into the tags wrapper */
  
    /* END LOOP: for every article: */
  
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
  
    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');
  }