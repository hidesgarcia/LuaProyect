import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import ws from 'ws';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Quiz from './pages/Quiz';
import Rankings from './pages/Rankings';
import Forum from './pages/Forum';
import Chat from './pages/Chat';
import Navigation from './components/Navigation';

// Apollo Client Setup
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
  webSocketImpl: ws,
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        {token && <Navigation onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/courses" element={token ? <Courses /> : <Navigate to="/login" />} />
          <Route path="/course/:id" element={token ? <CourseDetail /> : <Navigate to="/login" />} />
          <Route path="/quiz/:id" element={token ? <Quiz /> : <Navigate to="/login" />} />
          <Route path="/rankings" element={token ? <Rankings /> : <Navigate to="/login" />} />
          <Route path="/forum" element={token ? <Forum /> : <Navigate to="/login" />} />
          <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
