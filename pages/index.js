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

const Home = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('lessons').where('isTaken', '==', false)
  )

  const [email, setEmail] = React.useState('')
  const [showLessons, setShowLessons] = React.useState(false)
  const [selected, setSelected] = React.useState([])

  const submit = () => {
    if (!email) {
      return toast.error('Please enter your school email.')
    }
    if (!selected.length) {
      return toast.error('Please select at least one class')
    }

    selected.forEach(id => {
      firebase.firestore().doc(`lessons/${id}`).update({
        'isTaken': true,
        'takenBy': email
      })
    })

    Router.push('/done')
  }

  return (
    <>
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
    <ToastContainer />
    <div className="container mt-5 mb-5">
      <h2>
        {
          showLessons
          ? 'Select which lessons you would like to teach.'
          : 'Please enter your school email'
        }
      </h2>

      <div className="input-group mb-3 mt-4">
        <input onChange={e => setEmail(e.target.value)} value={email} type="text" className="form-control" placeholder="School email" />
        <div className="input-group-append">
          <span className="input-group-text">@kingalfred.org.uk</span>
        </div>
      </div>

      <button onClick={() => setShowLessons(true)} className="btn btn-primary">
        Show Lessons
      </button>

      { showLessons && <h5 className='mt-5'>Free Lessons</h5> }
      <ul className="list-group mt-1">
        {
          (value && showLessons)
          && value.docs.map(x => (
            <li
              onClick={() => {
                var i = selected.indexOf(x.id)
                if (i < 0) {
                  setSelected([...selected, x.id])
                } else {
                  setSelected(selected.filter(a => a !== x.id))
                }
              }}
              key={x.id}
              className={
                `list-group-item ${selected.indexOf(x.id) >= 0 ? 'active' : ''}`
              }>
              <b>{x.data().title}</b> Period {x.data().period}, Year {x.data().year}
            </li>
          ))
        }
      </ul>

      {
        showLessons
        &&
        <div className="fixed-bottom">
          <button className="btn btn-primary float-right mr-3 mb-3" onClick={() => submit()}>
            Submit (no going back!)
          </button>
        </div>
      }
    </div>

    </>
  )
}

export default Home
