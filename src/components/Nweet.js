import { dbService } from 'fbase';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editting, setEditting] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      // delete nwwet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };
  const toggleEditting = () => setEditting((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditting(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editting ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newNweet}
              placeholder="Edit your nweet"
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditting}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditting}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
