import css from './Home.module.css';

export default function Home() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Wellcome to Tweets</h1>
      <h2 className={css.subtitle}>Please go to Tweets page to continue</h2>
    </div>
  );
}
