import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/Layout/Layout';
import AppHeader from '../../components/Layout/AppHeader/AppHeader';
import Button from '../../components/Common/Button/Button';
import NewsList from '../../components/News/NewsList/NewsList';

import './news.module.scss';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

const News = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews(pageToLoad = 1) {
    try {
      const response = await fetch(`/api/news?page=${pageToLoad}`)
      const result = await response.json();

      return setNews(news.concat(result.data));
    } catch (error) {
      console.error(error);
    }
  }

  function loadMoreNews() {
    const nextPage = page + 1;
    fetchNews(nextPage);
    setPage(nextPage);
  }

  return (
    <Layout>
      <Head>
        <title>သတင်းများ</title>
      </Head>
      <AppHeader>
        <div className="text-bold">
          သတင်းများ
        </div>
        <div>
          <Link href="/news/search">
            <a>
              <Button className="color-primary">
                <i className="material-icons">search</i>
              </Button>
            </a>
          </Link>
        </div>
      </AppHeader>
      <div id="News" className="News container">
        <div className="row">
          <div className="col-12">
            <InfiniteScroll
              dataLength={news.length}
              next={loadMoreNews}
              hasMore={true}
            >
              <NewsList news={news} />
            </InfiniteScroll>
            </div>
          </div>
      </div>
    </Layout>
  );
}

export default News;
