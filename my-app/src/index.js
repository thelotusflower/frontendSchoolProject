import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './index.css';

const VkPostsAPI = {
  postlist: [
    { number: 1, name: "Котики", links: ['mdk', 'habr'] },
    { number: 2, name: "Мемы", links: ['mdk', 'habr'] },
    { number: 3, name: "Java", links: ['mdk', 'habr'] }
  ],
  vkLink: '',
  all: function() { return this.postlist},
  get: function(id) {
    const isVkPosts = p => p.number === id
    return this.postlist.find(isVkPosts)
  }
}

class CategiriesMenu extends React.Component {
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

     addNewCategory = (value) => {
         const { changePosts, posts } = this.props;
         const { categoryName } = this.state;
         console.log(VkPostsAPI.postlist);
         changePosts([...posts, { number: posts.length + 1, name: categoryName, links: ['mdk', 'habr']}])
         // VkPostsAPI.postlist.push()
     }

    render() {
        const { posts: postList } = this.props;
        // const postList = this.props.posts;
        const { categoryName } = this.state;

        return (
            <div className="feed_body">
                <input type="text" value={categoryName} onChange={this.setCategoryName} placeholder="Введите имя категории..." />
                <button disabled={!categoryName} onClick={this.addNewCategory}>Создать новую категорию</button>
                <ul>
                  {
                    postList.map(p => (
                      <li key={p.number} className="nav_item">
                        <Link to={`/postlist/${p.number}`}>{p.number} {p.name}</Link>
                      </li>
                    ))
                  }
                </ul>
            </div>
        )
    }
}

const VkPosts = (props) => {
  const { id, posts, b } = props;
  const paramsNumber = parseInt(props.match.params.number, 10);

  const post = posts.find(p => p.number === Number(id))
  const addVkLink = link => post.links.push(link)
  let newVkLink = ''
  const setNewVkLink = e => {newVkLink = e.target.value; console.log(75, props)};

  if (!post) {
    return <div>
        <h1 className="feed_header">
            <Link to='/postlist'>
                <img src="http://ooep.kpi.ua/page_res/back.png" width="15"/> назад
            </Link>
        </h1>
        <h1 className="feed_header">Посты не найдены</h1>
      </div>
  }
  return (
  <div>
    <h1 className="feed_header">
        <Link to='/postlist'>
            <img src="http://ooep.kpi.ua/page_res/back.png" width="15"/> назад
        </Link>
    </h1>
    <h1 className="feed_header">#{post.number} {post.name}</h1>
    <div className="feed_header">Добавить новую группу
        <input type="text" onChange={(e) => {setNewVkLink(e)}} placeholder="Введите имя группы..." />
        <button onClick = {() => {addVkLink(newVkLink)}}>Создать новую группу</button>
    </div>
    <div className="feed_header">Мои группы:
    {
      post.links.map(g => (
        <li key={g.number}>
          {g}
        </li>
      ))
    }
    </div>
    <div className="feed_header">Топ посты :</div>

    <div className="feed_item">
        <div className="feed_img">
          <img src="https://i1.sndcdn.com/avatars-000154620368-s64hq8-t500x500.jpg" width="90"/>
        </div>
        <div className="feed_body">
          <div className="feed_autor">
            MDK
          </div>
          <div className="feed_text">
            And that's not a joke, we really do.
            <div>
                <img src="https://previews.123rf.com/images/alinamd/alinamd1801/alinamd180100029/92714849-bright-sunny-day-in-park-the-sun-rays-illuminate-green-grass-and-trees-.jpg" width="55%"/>
            </div>
          </div>
          <div className="feed_likes">
            <img src="https://i.pinimg.com/originals/00/da/4a/00da4ad5acf86d5f802038c527dbf635.png" width="25"/><span className="feed_amount">24</span>
            <img src="https://image.flaticon.com/icons/svg/1999/1999353.svg" width="25"/><span className="feed_amount">40</span>
            <img src="https://pngimage.net/wp-content/uploads/2018/06/views-icon-png-4.png" width="25"/><span className="feed_amount">634</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const PostLists = (props) => (
  <Switch>
    <Route exact path='/postlist' render={routeProps => <CategiriesMenu {...routeProps} {...props}/>}/>
    <Route path='/postlist/:id' render={routeProps => {
        console.log(135, routeProps, props);
        return <VkPosts  {...routeProps} {...props} id={routeProps.match.params.id} />;
    }}/>
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

const Main = (props) => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/postlist' render={postProps => <PostLists {...postProps} {...props} /> }/>
    </Switch>
  </main>
)

const SidebarRight = () => (
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
              <Link to='/postlist' className="nav_item">Посты</Link>
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

class App extends React.Component {
    state = {
        posts: VkPostsAPI.postlist,
    }
    changePosts = (posts) => {
        this.setState({posts})
    }
     render () {
         return (
          <div className="app">
           <div className="wrapper">
                <Icon />
                <Main posts={this.state.posts} changePosts={this.changePosts}/>
                <SidebarRight />
            </div>
          </div>
         )
    }
}

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'))
