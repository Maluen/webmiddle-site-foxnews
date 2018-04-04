import test from 'ava';
import { services } from '../src/index.js';
import { rootContext } from 'webmiddle';

test('SearchArticles', async t => {
  const { SearchArticles } = services;

  const resource = await rootContext.extend({
    expectResource: true
  }).evaluate((
    <SearchArticles
      name="searchArticles"
      query="science"
      pageNumber={0}
      startYear={2007}
    />
  ));

  t.is(resource.contentType, 'application/json');
  t.is(typeof resource.content.root, 'object');
});

test('ArticleDetails', async t => {
  const { ArticleDetails } = services;

  const resource = await rootContext.extend({
    expectResource: true
  }).evaluate((
    <ArticleDetails
      url="http://www.foxnews.com/science/2017/01/19/nasa-study-paving-way-for-human-travel-to-mars.html"
    />
  ));

  t.is(resource.contentType, 'application/json');
  t.is(typeof resource.content.root, 'object');
});
