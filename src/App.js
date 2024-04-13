import Dashboard from "./Components/Dashboard"
import Widget from "./Components/Widget";

function App() {
  return (
    <div className="flex min-w-lvh min-h-lvh bg-gradient-to-r from-green-400 to-blue-500 ba-cover smallcover">
    <div className="flex flex-col sm:flex-row items-center w-full justify-around">
    <div className="flex items-center h-full w-full max-w-lg">
       <Widget></Widget>
    </div>
       <Dashboard></Dashboard>
    </div>
    </div>
  );
}

export default App;