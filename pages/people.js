import Head from 'next/head'
import firebase from 'firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from "next/router"

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDepUgg6_prIbys3zKDifGKe81CLVwD8Ag',
    authDomain: 'th-teaching-day-picker.firebaseapp.com',
    databaseURL: 'https://th-teaching-day-picker.firebaseio.com',
    projectId: 'th-teaching-day-picker',
    storageBucket: 'th-teaching-day-picker.appspot.com',
    messagingSenderId: '465601132512',
    appId: '1:465601132512:web:c0a247e7673c15f6921d85'
  })
}

export default () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('lessons')
  )

  return (<>
    <Head>
      <title>6th Teaching Day Picker</title>
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>

    <div className="container">
      <h5 className='mt-5'>Lessons</h5>
      <ul className="list-group mt-1">
        {
          !loading
          && value.docs.map(x => (
            <li
              key={x.id}
              className="list-group-item">
              <b>{x.data().title}</b> Period {x.data().period}, Year {x.data().year} <br/>
              <span className="badge badge-primary">{x.data().takenBy}</span>
            </li>
          ))
        }
      </ul>
    </div>
  </>)
}