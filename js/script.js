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
   const titles = document.querySelector('.titles');
   titles.innerHTML = ''
   const articles = document.querySelectorAll('.post')
   for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML
    const html = '<li><a href="#'+articleId+'"><span>'+articleTitle+'</span></a></li>'
    titles.innerHTML = titles.innerHTML + html
    
   }
   const links = document.querySelectorAll('.titles a');
  
   for(let link of links){
     link.addEventListener('click', titleClickHandler);
   }
 
  }
  generateTitleLinks()