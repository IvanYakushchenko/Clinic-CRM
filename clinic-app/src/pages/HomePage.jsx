import { useLocalStorage } from "../hooks/useLocalStorage";

const HomePage = () => {
  const [count, setCount] = useLocalStorage("count", 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Головна сторінка</h1>
      <p>Значення з localStorage: {count}</p>
      <button onClick={() => setCount(count + 1)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        +1
      </button>
    </div>
  );
};

export default HomePage;