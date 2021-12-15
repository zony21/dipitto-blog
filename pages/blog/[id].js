import Date from "../../components/Date";
import { client } from "../../libs/client";
import Layout from '../../components/layout'

export default function BlogId({ blog }) {
  return (
    <Layout>
      <h2>{blog.title}</h2>
      <div className="cat">{blog.category.name}</div>
      <p>
        <Date dateString={blog.publishedAt} />
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.main}`,
        }}
      />
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};