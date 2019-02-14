import m from 'mithril'

const root = document.getElementById('app')


const Home = {
    oninit: ({ state: vs }) => {
        vs.isFetching = false
        vs.user = {}

        vs.getData = () => m.request({
            method: 'GET',
            url: 'https://randomuser.me/api/'
        })
            .then(response => {
                //console.log(response)
                const user = response.results[0]
                vs.user = {
                    name: `${user.name.first} ${user.name.last}`,
                    picture: user.picture.large,
                    username: user.login.username,
                    email: user.email,
                    phone: user.phone,
                    city: `${user.location.street} - ${user.location.city} - ${user.location.state} - ${user.location.postcode}`
                }
                vs.isFetching = false
            })
    },

    view: ({ state: vs }) => {
        return m('.content.section', m('table.table', [
            m('tr', [
                m('[width="150"]', vs.isFetching ? '...' : vs.user.picture ? m('img', {
                    src: vs.user.picture,
                    alt: ''
                }) : '')
            ]),
            m('tr', [
                m('th', 'Name'),
                m('td', vs.isFetching ? '...' : vs.user.name || '-')
            ]),
            m('tr', [
                m('th', 'Username'),
                m('td', vs.isFetching ? '...' : vs.user.username || '-')
            ]),
            m('tr', [
                m('th', 'Email'),
                m('td', vs.isFetching ? '...' : vs.user.email || '-')
            ]),
            m('tr', [
                m('th', 'Phone'),
                m('td', vs.isFetching ? '...' : vs.user.phone || '-')
            ]),
            m('tr', [
                m('th', 'City'),
                m('td', vs.isFetching ? '...' : vs.user.city || '-')
            ]),
            m('br'),
            m('button.button.is-primary', {
                className: vs.isFetching ? 'is-loading' : '',
                onclick: () => {
                    vs.isFetching = true
                    vs.getData()
                }
            }, 'Get random user')
        ]))
    }
}



const routes = {
    '/': Home
}

m.route(root, '/', routes)