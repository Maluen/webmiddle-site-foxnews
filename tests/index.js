import test from 'ava';
import foxNews from '../src/index';
import { rootContext, isResource } from 'webmiddle';

const { components } = foxNews;

test('SearchArticles', async t => {
  const { SearchArticles } = components;

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

  t.true(isResource(resource));
  t.is(resource.contentType, 'application/json');
  t.is(typeof resource.content.root, 'object');
});

test('ArticleDetails', async t => {
  const { ArticleDetails } = components;

  const resource = await rootContext.extend({
    expectResource: true
  }).evaluate((
    <ArticleDetails
      url="http://www.foxnews.com/science/2017/01/19/nasa-study-paving-way-for-human-travel-to-mars.html"
    />
  ));

  t.true(isResource(resource));
  t.is(resource.contentType, 'application/json');
  t.is(typeof resource.content.root, 'object');
});
