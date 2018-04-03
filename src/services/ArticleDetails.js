import { PropTypes } from 'webmiddle';
import Pipe from 'webmiddle-service-pipe';
import HttpRequest from 'webmiddle-service-http-request';
import HtmlToJson, { helpers } from 'webmiddle-service-cheerio-to-json';

const {
  elText, elAttr, elMap, elJoin, elPipe,
} = helpers;

function ArticleDetails({ url }) {
  return (
    <Pipe>
      <HttpRequest
        name="rawHtml"
        contentType="text/html"
        url={url}
      />

      {({ rawHtml }) =>
        <HtmlToJson name="articleDetails" from={rawHtml}>
          <article el="article">
            <category
              el="h2 > a"
              condition={el => el.attr('href').startsWith('/category/')}
            >
              {el =>
                // "/category/science/air-and-space/astronomy.html"
                // => "science/air-and-space/astronomy"
                el.attr('href').match(/category\/(.+).html/)[1]
              }
            </category>

            <title el="h1[itemprop='headline'], h1">{elText()}</title>
            <date el="time[itemprop='datePublished'], time[pubdate]">{elAttr('datetime')}</date>

            <text el="div[itemprop='articleBody'] p, .article-text">
              {elPipe([
                elMap(elText()),
                elJoin('\n\n'),
                text => text.trim(),
              ])}
            </text>
          </article>
        </HtmlToJson>
      }
    </Pipe>
  );
}

ArticleDetails.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ArticleDetails;
