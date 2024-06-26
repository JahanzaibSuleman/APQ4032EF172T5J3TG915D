import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './components';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
