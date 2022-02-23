import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  // For form submissions (when user presses enter)

  const convertUserInput = async (event) => {
    event.preventDefault(); // Prevent page refresh

    // Call the internal API with a POST request

    const response = await fetch(
      '/api/convert',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          num: event.target.num.value
        }),
        method: 'POST'
      }
    )

    // The result is the response from the API (converted to the JSON format)

    const result = await response.json();

    document.getElementById('output').textContent = result.conversion;

    event.target.reset();
  }

  // For click events (when user uses the cursor to press the submit button)

  const generateResult = async () => {
    let userInput = document.getElementById('num').value;

    const resp = await fetch(
      '/api/convert',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          num: userInput
        }),
        method: 'POST'
      }
    )

    const clickResult = await resp.json();
    document.getElementById('output').textContent = clickResult.conversion;
    document.getElementById('num').value = '';
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Roman Numeral and Integer Converter</title>
        <meta name="description" content="A Next.js app that converts Roman Numerals to integers, and integers to Roman Numerals." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Roman Numeral Converter</h1>

        <h2 className={styles.description}>
          Input a Roman Numeral from 1-1000, and this app will convert it to an integer.
          Enter any integer from 1-1000, and this app will convert it to a Roman Numeral.
        </h2>

        <div className={styles.wrapper}>
          <form onSubmit={convertUserInput} className={styles.form}>
            <label htmlFor="num" className={styles.label}>Enter an integer or Roman Numeral:</label>
            <input className={styles.input} type="text" id="num" name="num" required />
          </form> 

          <button className={styles.submit} type="submit" onClick={generateResult}>Submit</button>

          <p className={styles.output} id="output"></p>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
