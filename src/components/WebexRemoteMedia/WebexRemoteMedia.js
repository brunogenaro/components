import React from 'react';
import PropTypes from 'prop-types';
import {Badge, Spinner} from '@momentum-ui/react';

import {useMeeting, useStream} from '../hooks';

import './WebexRemoteMedia.scss';

/**
 * Webex Remote Media component displays the meeting's remote video
 *
 * @param {object} props
 * @returns {object} JSX of the component
 *
 * NOTE: waiting for the UX for a design on what to display if there is no remote video
 */
export default function WebexRemoteMedia({meetingID}) {
  const {remoteAudio, remoteVideo} = useMeeting(meetingID);
  const audioRef = useStream(remoteAudio);
  const videoRef = useStream(remoteVideo);
  const hasMedia = !!(remoteAudio || remoteVideo);

  return (
    <div className="remote-media">
      {!hasMedia ? (
        <Badge rounded>
          <Spinner size={16} />
          <div>Connecting</div>
        </Badge>
      ) : null}
      {remoteVideo ? <video ref={videoRef} playsInline autoPlay /> : null}
      {remoteAudio ? <audio ref={audioRef} autoPlay /> : null}
    </div>
  );
}

WebexRemoteMedia.propTypes = {
  meetingID: PropTypes.string.isRequired,
};
