// import AddNote from "./AddNote"
import Notes from "./Notes"

export const Home = (props) => {
  const {showAlert} = props;
  
  return (
    <div>
      {/* <AddNote/> */}
      
      <Notes showAlert={showAlert}/>
    </div>
  )
}
