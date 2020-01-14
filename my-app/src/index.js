import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './index.css';

// For this demo, we are using the UMD build of react-router-dom


// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const SinglePostAPI = {
  posts: [
    { number: 1, name: "Котики" },
    { number: 2, name: "Мемы" },
    { number: 3, name: "Java" }
  ],
  all: function() { return this.posts},
  get: function(id) {
    const isSinglePost = p => p.number === id
    return this.posts.find(isSinglePost)
  }
}

// The AllPosts iterates over all of the posts and creates
// a link to their profile page.

class AllPosts extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        categoryName: '',
      }
    }

    setCategoryName = (event) => {
       this.setState({
         categoryName: event.target.value,
       });
     }

     addNewCategory(value) {
         console.log(SinglePostAPI.posts);
         SinglePostAPI.posts.push({ number: SinglePostAPI.posts.length + 1, name: this.state.categoryName })
     }

    render() {
        return (
            <div className="feed_body">
                <input type="text" value={this.state.categoryName} onChange={this.setCategoryName} placeholder="Введите имя категории..." />
                <button onClick = {() => {this.addNewCategory()}}>Создать новую категорию</button>
                <ul>
                  {
                    SinglePostAPI.all().map(p => (
                      <li key={p.number} className="nav_item">
                        <Link to={`/posts/${p.number}`}>{p.number} {p.name}</Link>
                      </li>
                    ))
                  }
                </ul>
            </div>
        )
    }
}

// The SinglePost looks up the post using the number parsed from
// the URL's pathname. If no post is found with the given
// number, then a "post not found" message is displayed.
const SinglePost = (props) => {
  const post = SinglePostAPI.get(
    parseInt(props.match.params.number, 10)
  )
  if (!post) {
    return <div>
        <h1 className="feed_header">
            <Link to='/posts'>
                <img src="http://ooep.kpi.ua/page_res/back.png" width="15"/> назад
            </Link>
        </h1>
        <h1 className="feed_header">Посты не найдены</h1>
      </div>
  }
  return (
  <div>
    <h1 className="feed_header">
        <Link to='/posts'>
            <img src="http://ooep.kpi.ua/page_res/back.png" width="15"/> назад
        </Link>
    </h1>
    <h1 className="feed_header">#{post.number} {post.name}</h1>
    <h1 className="feed_header">Топ посты :</h1>
    <div className="feed_item">
        <div className="feed_img">
          <img src="https://i1.sndcdn.com/avatars-000154620368-s64hq8-t500x500.jpg" width="125"/>
        </div>
        <div className="feed_body">
          <div className="feed_autor">
            MDK
          </div>
          <div className="feed_text">
            And that's not a joke, we really do.
          </div>
          <div className="feed_likes">
            <img src="https://i.pinimg.com/originals/00/da/4a/00da4ad5acf86d5f802038c527dbf635.png" width="25"/><span className="feed_amount">24</span>
            <img src="https://image.flaticon.com/icons/svg/1999/1999353.svg" width="25"/><span className="feed_amount">40</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// The Posts component matches one of two different routes
// depending on the full pathname
const Posts = () => (
  <Switch>
    <Route exact path='/posts' component={AllPosts}/>
    <Route path='/posts/:number' component={SinglePost}/>
  </Switch>
)

const Home = () => (
    <div>
      <h1 className="feed_header">Сервис для построения рейтингов постов из VK</h1>
      <div className="section_block section_block--content">
        <p className="feed_body">Наш сервис позволяет задать интересующий набор сообществ, по которым нужно отбирать наиболее интересные посты за определенное время.</p>
      </div>
    </div>
)

const Icon = () => (
    <aside className="layout_header">
        <img src="https://image.flaticon.com/icons/png/512/1946/1946355.png" width="25"/>
     </aside>
)

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/posts' component={Posts}/>
    </Switch>
  </main>
)

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <menu className="layout_header">
        <div className="section">
          <div className="section_block section_block--header">
            <h3 className="section_title">Категории:</h3>
          </div>
          <ul>
            <li>
              <Link to='/' className="nav_item">Главная</Link>
            </li>
            <li>
              <Link to='/posts' className="nav_item">Посты</Link>
            </li>
          </ul>
        </div>
        <div className="section">
          <div className="section_block section_block--header">
            <h3 className="section_title">О приложении</h3>
          </div>
          <div className="section_block section_block--content">
            <p>Сервис для построения рейтингов постов из VK</p>
            <p>Наш сервис позволяет задать интересующий набор сообществ, по которым нужно отбирать наиболее интересные посты за определенное время.</p>
          </div>
         </div>
    </menu>
  </header>
)

const App = () => (
  <div className="app">
   <div className="wrapper">
        <Icon />
        <Main />
        <Header />
    </div>
  </div>
)

// This demo uses a HashRouter instead of BrowserRouter
// because there is no server to match URLs
ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'))
