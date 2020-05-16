import React from 'react';
import ScrollBottom from 'react-scroll-to-bottom'

const TextContainer = ({ users }) => {
  return (
    <div className="textContainer-custom">
      <div>
        <h1 className="font-bold">Quick Chatting <span role="img" aria-label="emoji">💬</span></h1>
        <h2>Aplikasi Chatting dibuatkan oleh <span role="img" aria-label="emoji">❤️</span> Waingapu Developer</h2>
      </div>
      {
        users
          ? (
            <ScrollBottom className="messages-custom">  
              {users.map(({name, imgurl}) => (
                <div key={name} className="activeItem-custom">
                  <span className="mr-6">{name.replace('_', ' ')}</span>
                  {(<img className="h-10 w-10 object-cover rounded-full mx-auto md:mx-0 md:mr-6" alt="Online Icon"  src={imgurl.replace('?token=', '&token=').replace("/quick-chatting/", "/quick-chatting%2F")} />)}
                </div>
              ))}
            </ScrollBottom>              
        )
          : null
      }
    </div>  
  );

};

export default TextContainer;

