type News = {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: number;
};

export default async function News() {
  const news: News[] = await fetch("http://localhost:4002/news", {
    next: {
      revalidate: 5,
    },
  }).then((res) => res.json());

  if (!news) return;

  return (
    <div>
      <h2>최신 기술 뉴스</h2>
      <div>
        <p>
          ISR 페이지는 빌드 시점에 데이터를 미리 가져와서 캐싱 후, 사용자 요청
          시 캐싱해둔 데이터로 페이지를 렌더링하는 방식입니다. 유효시간이 지나면
          서버에서 데이터를 다시 가져와서 페이지를 재생성합니다.
        </p>
        <p>
          실시간 업데이트가 중요하지 않은 경우, 서버 비용을 절감할 수 있고,
          빠르게 사용자에게 페이지를 제공할 수 있습니다.
        </p>
      </div>
      <div className="mt-10">
        {news.map((newsItem) => (
          <article key={newsItem.id}>
            <div>
              <h3>{newsItem.title}</h3>
              <p>{newsItem.content}</p>
            </div>
            <div>
              <span>작성자: {newsItem.author}</span>
              <span>카테고리: {newsItem.category}</span>
              <span>
                작성일: {new Date(newsItem.createdAt).toLocaleDateString()}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
