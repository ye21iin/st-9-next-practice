type Intro = {
  description1: string;
  description2: string;
  description3: string;
};

export default async function Home() {
  const intro: Intro = await fetch("http://localhost:4002/intro", {
    cache: "force-cache",
  }).then((response) => response.json());

  if (!intro) return;

  return (
    <div>
      <div>
        <h1 className="font-extrabold text-4xl mt-5">
          React to Next.js 마이그레이션 프로젝트
        </h1>
        <div>
          <p className="text-red-500 m-5">
            SSG 페이지는 빌드 시점에 데이터를 미리 가져와서 캐싱 후, 사용자 요청
            시 캐싱해둔 데이터로 페이지를 렌더링하는 방식입니다.
          </p>
          <p className="text-gray-500 m-5">
            변경되지 않는 정적인 페이지에 적절한 렌더링 방식입니다.
          </p>
        </div>
        <div className="flex flex-col gap-10 m-5">
          <p>{intro.description1}</p>
          <p>{intro.description2}</p>
          <p>{intro.description3}</p>
        </div>
      </div>
    </div>
  );
}
