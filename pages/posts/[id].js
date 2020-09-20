import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";
import { useContext, useEffect } from "react";
import darkModeContext from "../../context/darkMode";
import { useRouter } from "next/router";

export default function Post({ postData }) {
  const darkModeChange = useContext(darkModeContext);
  const [dark, setDark] = darkModeChange;

  return (
    <Layout dark={dark}>
      <Head>
        <title>{postData.title} :: SMG DayLog</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
