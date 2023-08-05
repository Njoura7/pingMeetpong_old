const CreateEvent = () => {
  return (
    <>
      <form>
        <label>
          EventID:
          <input
            type='text'
            name='event-id'
          />
        </label>
        <label>
          Location:
          <input
            type='next'
            name='location'
            placeholder='address'
          />
        </label>
        <label>
          Date:
          <input
            type='date'
            name='date'
          />
        </label>
        <label>
          Time:
          <input
            type='time'
            name='time'
          />
        </label>
        <label>
          Enter your Username:
          <input
            type='text'
            name='creator-username'
          />
        </label>
        <input
          type='submit'
          value='Submit'
        />
      </form>
    </>
  )
}

export default CreateEvent
