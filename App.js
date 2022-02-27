import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Task from "./components/Task";
import {useState} from "react";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const handleAddTask = () =>{
    Keyboard.dismiss();
    setTaskItems((prevValue)=>[...prevValue, task] );
    setTask(null);
  };
  const completeTask = (index) =>{
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Pomme de pain</Text>
         <View style={styles.items}>
           {taskItems.map((item, index)=> {
             return (<TouchableOpacity key={index}  onPress={()=> completeTask(index)}>
               <Task text={item}/>
             </TouchableOpacity>)
           })}
         </View>
      </View>


      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput  style={styles.input} placeholder={"Write a task"} value={task} onChangeText={text=>setTask(text)} />

        <TouchableOpacity onPress={()=>handleAddTask()} >
          <View style={styles.addWrapper}>
            <Text  style={styles.addText} >+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  items: {
    paddingVertical: 10,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  addText: {
  }
});
