import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './App.css';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Element from './components/element'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '@mui/system';


function App() {
  const [estado, setEstado] = useState('active')
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')
  const completadas = tasks.filter(value => value.state)

  const alertError= () => toast.error('The task is too short!', {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const alertDeleted = () =>  toast.warning('Task deleted!', {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  const alertSuccess = () => toast.success('Task added!', {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  const toggle = (index) => {
    let data = [...tasks];
    data[index].state = !data[index].state;
    setTasks(data);
  };

  const deleteTask = (i) => {
    const copy = [...tasks]
    copy.splice(i, 1)
    setTasks(copy)
    alertDeleted()
  }

  const deleteAll = () => {
    let copy = [...tasks]
    const a = copy.filter(value => value.state === false)
    setTasks(a)
    alertDeleted()
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (text.length > 3) {
      setTasks([...tasks, { value: text, state: false, date: new Date().toLocaleString() }])
      setText('')
      alertSuccess()
    } else {
      alertError()
    }
  }
  

  return (
    <div className="App">
      <div className='App2'>
        <h2>To - Do</h2>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'center' }} >
          <Tabs value={estado} aria-label="basic tabs example"
          >

            <Tab label="All" sx={{ mx: 1 }}
              onClick={() => setEstado('all')} value={"all"} />

            <Tab label="Active" sx={{ mx: 1 }}
              onClick={() => setEstado('active')} value={"active"} />

            <Tab label="Completed" sx={{ mx: 1 }}
              onClick={() => setEstado('completed')} value={"completed"} />

          </Tabs>
        </Box>
        {estado === 'completed' ? null :
          (
            <div style={{ display: 'flex', height: '4em', marginTop: "1em" }}>
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>

                <OutlinedInput onChange={(event) => setText(event.target.value)}
                  placeholder="Add a Task" sx={{ width: '65%', height: 50}} value={text} />

                <Button type="submit" variant="contained" sx={{ width: '30%', ml: 1, height: 50 }} >
                  Add
                </Button>

              </form>
            </div>
          )
        }

        {tasks.map((value, index) => (
          <Box sx={{ my: 1, textAlign: 'left',wordBreak: 'break-word' }} key={index} >
            <Element valor={value} onChange={() => toggle(index)}
              section={estado} erase={() => deleteTask(index)}
            />
          </Box>

        ))}
        {estado === 'completed' && completadas.length > 0 ? (
          <div style={{ justifyContent: 'right', display: 'flex' }}>
            <Button variant="contained" style={{ background: 'red' }} onClick={deleteAll} >
              Delete All
            </Button>
          </div>
        ) : null}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      >
      </ToastContainer>
    </div>
  );
}

export default App;
