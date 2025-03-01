/* @applo/client */
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql
} from '@apollo/client';

/* @mantine/core */
import {
  MantineProvider,
  Container,
  Title,
  Button,
  List,
  ListItem,
  Text,
  Checkbox
} from '@mantine/core';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const TOGGLE_TODO_COMPLETED = gql`
  mutation ToggleTodoCompleted($id: ID!) {
    toggleTodoCompleted(id: $id) {
      id
      completed
    }
  }
`;

const Todos = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodoCompleted] = useMutation(TOGGLE_TODO_COMPLETED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleAddTodo = () => {
    const text = prompt('Enter TODO text:');
    if (text) {
      addTodo({
        variables: { text },
        refetchQueries: [{ query: GET_TODOS }],
      });
    }
  };

  return (
    <Container>
      <Title order={1}>TODO List</Title>
      <Button onClick={handleAddTodo} style={{ marginBottom: '20px' }}>Add TODO</Button>
      <List>
        {data.todos.map((todo: any) => (
          <ListItem key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodoCompleted({ variables: { id: todo.id }, refetchQueries: [{ query: GET_TODOS }] })}
              label={<Text style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</Text>}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <MantineProvider defaultColorScheme="dark">
      <Todos />
    </MantineProvider>
  </ApolloProvider>
);

export default App;
