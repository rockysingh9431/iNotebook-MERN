import Notes from "./Notes"
const Home = (props) => {
  return (
    <div className="container Home">
      <Notes showAlert={props.showAlert}/>   
    </div>

  )
}

export default Home