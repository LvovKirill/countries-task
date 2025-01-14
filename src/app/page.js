import CountryList from "./CountryList";

export default async function Home() {
  const data = await fetch('https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json');
  const countries = await data.json();

  return (
    <CountryList list={countries}/>
  );
}









