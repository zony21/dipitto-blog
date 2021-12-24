import Head from 'next/head'
import Layout from '../components/layout'
import Blog from '../components/blog'

export default function Home(props) {
  return (
    <Layout>
      <Head>
        <title>{props.titlename}</title>
        <meta name="twitter:title" content={props.titlename} />
        <meta name="twitter:image" content="/images/link_img.jpg" />
      </Head>
      <div className="blog_wrap cont_wrap">
        <div className="box">
          <Blog blogtag={props.blogtag} filterTag={props.filterTag} tagFilter={props.tagFilter}  catFilter={props.catFilter} filterCat={props.filterCat} handleFilter={props.handleFilter} blogcat={props.blogcat} filterQuery={props.filterQuery} totalCount={props.totalCount} active={props.active} getNextpage={props.getNextpage} filteredTask={props.filteredTask} pageCount={props.pageCount} pageNaition={props.pageNaition} />
        </div>
      </div>
    </Layout>
  )
}
