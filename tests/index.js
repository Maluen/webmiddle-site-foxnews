import test from 'ava';
import FoxNews from '../src/index.js';
import WebMiddle, { evaluate, createContext } from 'webmiddle';

test.beforeEach(t => {
  t.context.webmiddle = new WebMiddle();
});

test('SearchArticles', async t => {
  const SearchArticles = FoxNews.service('SearchArticles');

  await evaluate(createContext(t.context.webmiddle, { expectResource: true }), (
    <SearchArticles
      name="searchArticles"
      query="science"
      pageNumber={0}
      startYear={2007}
    />
  ));
});

test('ArticleDetails', async t => {
  const ArticleDetails = FoxNews.service('ArticleDetails');

  await evaluate(createContext(t.context.webmiddle, { expectResource: true }), (
    <ArticleDetails
      url="http://www.foxnews.com/science/2017/01/19/nasa-study-paving-way-for-human-travel-to-mars.html"
    />
  ));
});
