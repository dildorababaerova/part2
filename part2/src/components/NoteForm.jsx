const NoteForm = ({onSubmit, handleChange, value}) => {
    return (
      <div>
        <h2>Create a new note</h2>
  
        <form onSubmit={onSubmit}>
          <input
            value={value}
            onChange={handleChange}
          />
          <button type="submit" className="saveButton">save</button>
        </form>
      </div>
    )
  }
  export default NoteForm