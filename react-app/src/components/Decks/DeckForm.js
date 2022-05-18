import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect, useHistory } from 'react-router-dom';
import { createADeck, editADeck } from '../../store/decks';

const DeckForm = ({ setShowModal, type, deck }) => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
    const [share, setShare] = useState(false);
    const [ownerId, setOwnerId] = useState('');

  const userId = useSelector((state) => state.session?.user.id)

  const dispatch = useDispatch();

  useEffect(() => {
      if (deck) {
          setName(deck.name)
          setAbout(deck.about)
          setOwnerId(deck.owner_id)
          setShare(deck.share)
      }
  }, [deck])

  const handleSubmit = async (e) => {
      if (type === "create") {
          e?.preventDefault();
          const data = await dispatch(createADeck({name, about, share, user_id: +userId, owner_id: +userId}))
          if (data.errors) {
            setErrors(data.errors)
          } else {
              setShowModal(false)
          }
        } else {
          e?.preventDefault();
          const data = await dispatch(editADeck(deck.id, {name, about, share, user_id: +userId, owner_id: +ownerId}))
          if (data.errors) {
              setErrors(data.errors)
          } else {
            setShowModal(false)
        }
      }
  }

    return (
        <>
            <h2 className='modal-header'>{type === "create" ? "Create New Deck" : "Edit Deck"}</h2>
            <form className='create-deck-form' onSubmit={handleSubmit}>
                <div className='errors-div'>
                    {errors && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='input-label-div'>
                    <label>{type === "create" ? "Enter the name of your new deck:" : "Name:"}</label>
                    <input
                    type='text'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    ></input>
                    <span className='required-icon'>
                        <i className="fa-solid fa-asterisk"></i>
                    </span>
                </div>
                <div className='input-label-div'>
                    <label>{type === "create" ? "Write any details you want here:" : "About:"}</label>
                    <textarea
                    type='text'
                    name='about'
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                    ></textarea>
                </div>
                <div className='input-label-div share-div'>
                    <label className='share-label'>
                        <span className='share-check-div'>
                            <input
                                className='share-checkbox'
                                type="checkbox"
                                name="share"
                                checked={share}
                                value={share}
                                onChange={() => {
                                    
                                }}
                            ></input>
                            <svg
                                className={`checkbox ${share ? "checkbox-checked" : ""}`}
                                aria-hidden="true"
                                viewBox="0 0 50 50"
                                // width="100%" height="100%"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                // xmlns:xlink="http://www.w3.org/1999/xlink"
                                // xml:space="preserve"
                                // xmlns:serif="http://www.serif.com/"
                                // style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
                                onClick={() => {
                                    setShare(!share)
                                }}
                            >
                                {share ?
                                    <g transform="matrix(0.0863508,0,0,0.0863508,0.1,1.49508)">
                                        <path id="checked-path"
                                        d="M568.9,143.5L418,5.3C404.8,-6.773 384,3.039 384,21.84L384,96C241.2,97.63 128,126.1 128,260.6C128,314.9 163.2,368.7 202.08,396.8C214.22,405.581 231.5,394.562 227.02,380.34C186.7,252.2 256,224 384,223.1L384,297.3C384,316.12 404.84,325.89 418.02,313.81L568.92,175.61C578.4,167.8 578.4,152.2 568.9,143.5ZM416,384C398.33,384 384,398.33 384,416L384,447.1L64,447.099L64,128L96,128C113.67,128 128,113.68 128,96C128,78.32 113.7,64 96,64L64,64C28.65,64 0,92.65 0,128L0,447.1C0,482.44 28.65,511.1 64,511.1L384,511.099C419.35,511.099 448,482.439 448,447.099L448,416C448,398.3 433.7,384 416,384Z"
                                        style={{"fill":"green"}}
                                        />
                                    </g>
                                :
                                    <g transform="matrix(0.0864435,0,0,0.0864435,-5.11855e-08,1.50624)">
                                        <path
                                        d="M96.185,64.001L96,64L64,64C28.65,64 0,92.65 0,128L0,447.1C0,482.44 28.65,511.1 64,511.1L351.815,511.099L352,511.1L384,511.1C419.35,511.1 448,482.45 448,447.1L448,128C448,92.66 419.35,64 384,64L96.185,64.001ZM64,128L64,447.099L384,447.1L384,128.001L64,128Z"
                                        style={{"fill":"rgb(167, 47, 0)"}}
                                    />
                                    </g>
                                }
                            </svg>
                                {share ?
                                    " Yes, share with others!"
                                    :
                                    " Share this deck with other users?"
                                }
                        </span>
                        <i className={share ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                    </label>
                </div>
                <div className='button-container'>
                <button className="dark-buttons" type='submit'>Continue</button>
                </div>
            </form>
        </>
    )
}

export default DeckForm;