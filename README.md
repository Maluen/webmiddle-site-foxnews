# webmiddle-site-foxnews

> The site [webmiddle](https://github.com/webmiddle/webmiddle) for [Fox News](http://www.foxnews.com/)

## Install

```bash
npm install --save webmiddle-site-foxnews
```

## Usage

```jsx
import WebMiddle from 'webmiddle';
import FoxNews from 'webmiddle-site-foxnews';
const SearchArticles = FoxNews.service('SearchArticles');

const webmiddle = new WebMiddle();
webmiddle.evaluate((
  <SearchArticles
    name="searchArticles"
    query="science"
    pageNumber={0}
    startYear={2007}
  />
), {
  expectResource: true,
})
.then(resource => {
  console.log(resource);
});
```

## Services

### SearchArticles

Scrapes the HTML search articles page by using an headless browser, since the articles list is loaded on client-side.

**Properties**:

Name                   | Example
-----------------------|------------------
query                  | "javascript"
startYear (optional)   | 2007
endYear (optional)     | 2010
pageNumber             | 0

**Output**: JSON resource

```json
{
  "count": 21253,
  "articles": [
    {
      "article": {
        "url": "http://www.foxnews.com/health/2017/01/27/paris-and-michael-jackson-does-depression-run-in-families.html",
        "title": "Paris and Michael Jackson: Does depression run in families?",
        "description": "Paris Jackson recently spoke about struggling with both depression and anxiety.",
        "date": "Jan 27, 2017",
        "image": "http://a57.foxnews.com/www.foxnews.com/content/dam/fox-news/images/2017/01/27/180/102/michael-jackson-kids-reuters.jpg"
      }
    },
    {
      "article": {
        "url": "http://www.foxnews.com/health/2017/01/25/early-menopause-linked-to-womans-reproductive-history.html",
        "title": "Early menopause linked to a woman's reproductive history",
        "description": "The age at which women get their first period, along with the number of children they have, may influence when they enter menopause, a new study from Australia finds.",
        "date": "Jan 25, 2017",
        "image": "http://a57.foxnews.com/www.foxnews.com/content/dam/fox-news/images/2017/01/25/180/102/menopause-hot-flashes-istock-large.jpg"
      }
    },
    {
      "article": {
        "url": "http://www.foxnews.com/health/2017/01/25/fake-news-vaccine-could-stop-spread-false-information.html",
        "title": "Fake news 'vaccine' could stop spread of false information",
        "description": "It might be possible to prevent people from falling prey to fake news by \"inoculating\" them with warnings that false information is out there, new research suggests.",
        "date": "Jan 25, 2017",
        "image": "http://a57.foxnews.com/www.foxnews.com/content/dam/fox-news/images/2016/09/20/180/102/senior-using-a-laptop-internet-istock-large.jpg"
      }
    }
}
```

### ArticleDetails

Scrapes the HTML page of the article with the given url.  
The output includes the full article text.

**Properties**:

Name        | Example
------------|-------------------------------------
url         | "http://www.foxnews.com/science/2017/01/19/nasa-study-paving-way-for-human-travel-to-mars.html"

**Output**: JSON resource

```json
{
  "category": "science/air-and-space/nasa",
  "title": "NASA study paving way for human travel to Mars",
  "date": "2017-01-19T04:41:00.000-05:00",
  "text": "HONOLULU  –  A group of NASA-funded researchers are poised to enter an isolated geodesic dome on..."
}
```

## Settings

Name           | Description
---------------|--------------------------------------------------
resultsPerPage | Number of articles in each "search articles" page
