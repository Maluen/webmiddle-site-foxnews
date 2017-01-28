import WebMiddle, { PropTypes } from 'webmiddle';
import Pipe from 'webmiddle-service-pipe';
import Browser from 'webmiddle-service-browser';
import HtmlToJson, { helpers } from 'webmiddle-service-cheerio-to-json';
import config from '../config';

const {
  elText, elAttr, elMap, elPipe,
} = helpers;

function toStart(pageNumber) {
  return pageNumber * config.resultsPerPage;
}

function normalizeCount() {
  return (count) => parseInt(count.replace(/,/g, ''), 10);
}

function SearchArticles({ query, startYear, endYear, pageNumber }) {
  // foxnews returns no results if startYear is specified and endYear is not, or viceversa.
  if (typeof startYear !== 'undefined' && typeof endYear === 'undefined') {
    endYear = (new Date()).getFullYear();
  } else if (typeof endYear !== 'undefined' && typeof startYear === 'undefined') {
    startYear = 1800;
  }

  return (
    <Pipe>
      <Browser
        name="rawHtml"
        contentType="text/html"
        url={
          `http://www.foxnews.com/search-results/search?q=${encodeURIComponent(query)}&ss=fn` +
          (startYear ? `&min_date=${startYear}-01-01` : '') +
          (endYear ? `&max_date=${endYear}-12-31` : '') +
          `&start=${encodeURIComponent(toStart(pageNumber))}`
        }
        waitFor=".sort-ctrl"
      />

      {({ rawHtml }) =>
        <HtmlToJson name="searchArticles" from={rawHtml}>
          <count el="[ng-bind='numFound']">
            {elPipe([
              elText(),
              normalizeCount(),
            ])}
          </count>
          <articles el="[ng-repeat='article in articles']">
            {elMap(el => (
              <article el={el}>
                <url el="a[ng-bind='article.title']">{elAttr('href')}</url>
                <title el="a[ng-bind='article.title']">{elText()}</title>
                <description el="[ng-if='article.description']">{elText()}</description>
                <date el=".search-date">{elText()}</date>
                <image el="[ng-if='article.image'] img">{elAttr('src')}</image>
              </article>
            ))}
          </articles>
        </HtmlToJson>
      }
    </Pipe>
  );
}

SearchArticles.propTypes = {
  query: PropTypes.string.isRequired,
  startYear: PropTypes.number,
  endYear: PropTypes.number,
  pageNumber: PropTypes.number.isRequired, // starts at 0!
};

export default SearchArticles;
