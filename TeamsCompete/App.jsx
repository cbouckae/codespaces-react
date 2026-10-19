import './App.css';
import { useEffect, useRef, useState } from 'react';

const startingMessages = [
  { user: 'pixelpanda', color: '#e0a3ff', emote: '🧩', text: 'that angle was so clean', team: 'red' },
  { user: 'mossybyte', color: '#78dcca', emote: '🌿', text: 'one more round, you got this', team: 'red' },
  { user: 'sunnysideup', color: '#f5b768', emote: '☀️', text: 'the patience!!', team: 'blue' },
  { user: 'tinywizard', color: '#9cb8ff', emote: '🪄', text: 'clove diff honestly', team: 'red' },
  { user: 'orbitall', color: '#ff8e94', emote: '🪐', text: 'chat is locked in', team: 'blue' },
  { user: 'vexKnight', color: '#f2a0aa', emote: '♟️', text: 'red team holding the line', team: 'red' },
  { user: 'unc_phil', color: '#7eb9ff', emote: '🎧', text: 'lets goooo', team: 'red' },
  { user: 'JahzeBrahze', color: '#eec76f', emote: '🔥', text: 'what a game', team: 'blue' },
  { user: 'berrybyte', color: '#eaa4cc', emote: '🍓', text: 'checking in from Red team', team: 'red' },
  { user: 'rookieMoves', color: '#91c6ff', emote: '🕹️', text: 'blue team is not done yet', team: 'blue' },
  { user: 'starboard', color: '#d5a7ff', emote: '⭐', text: 'chat is moving tonight', team: 'red' },
  { user: 'mintCondition', color: '#83d1b8', emote: '🍃', text: 'that was so close', team: 'red' },
];

const teams = [
  { id: 'red', name: 'Red', color: '#ed334b' },
  { id: 'blue', name: 'Blue', color: '#3788ff' },
];

const cheerOptions = [100, 1000, 5000, 10000];
const giftPackages = [
  { count: 1 },
  { count: 5 },
  { count: 10, badge: 'POPULAR' },
  { count: 20 },
  { count: 50 },
  { count: 100 },
];

const initialDonors = [
  { name: 'vexKnight', amount: 320 },
  { name: 'unc_phil', amount: 180 },
  { name: 'JahzeBrahze', amount: 125 },
];

const simulatedChatters = [
  { user: 'berrybyte', color: '#eaa4cc', emote: '🍓', team: 'blue' },
  { user: 'vexKnight', color: '#f2a0aa', emote: '♟️', team: 'red' },
  { user: 'unc_phil', color: '#7eb9ff', emote: '🎧', team: 'red' },
  { user: 'rookieMoves', color: '#91c6ff', emote: '🕹️', team: 'blue' },
  { user: 'starboard', color: '#d5a7ff', emote: '⭐', team: 'blue' },
  { user: 'mintCondition', color: '#83d1b8', emote: '🍃', team: 'red' },
];

const simulatedChatLines = [
  'lets go Red team',
  'that was clean',
  'chat is locked in',
  'one more round',
  'come on Red team!',
  'points are climbing',
];

function Icon({ name, size = 20 }) {
  if (name === 'twitch') {
    return (
      <svg aria-hidden="true" height={size} viewBox="0 0 20 24" width={size}>
        <path fill="currentColor" d="M4 0 0 4v16h5.143V24l4-4h3.428L20 12.571V0H4zm14.286 11.429-3.429 3.428h-3.428L10 18.286v-3.429H5.143V1.714h13.143v9.715zM11.571 4.714h1.715v5.143h-1.715zm4.714 0H18v5.143h-1.715z" />
      </svg>
    );
  }

  const shared = {
    'aria-hidden': true,
    fill: 'none',
    height: size,
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
    width: size,
  };

  const shapes = {
    play: <path d="m8 5 11 7-11 7z" fill="currentColor" stroke="none" />,
    pause: <><path d="M8 5v14" strokeWidth="3" /><path d="M16 5v14" strokeWidth="3" /></>,
    volume: <><path d="M4 10v4h3l5 4V6l-5 4H4z" /><path d="M16 9a4 4 0 0 1 0 6" /><path d="M18.5 6.5a8 8 0 0 1 0 11" /></>,
    muted: <><path d="M4 10v4h3l5 4V6l-5 4H4z" /><path d="m16 9 5 6m0-6-5 6" /></>,
    expand: <><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" /></>,
    heart: <path d="M20.8 8.8c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10A4.8 4.8 0 0 1 12 6.6a4.8 4.8 0 0 1 8.8 2.2Z" />,
    gift: <><rect x="3" y="8" width="18" height="13" rx="1" /><path d="M12 8v13M3 12h18" /><path d="M12 8H7.5a2.5 2.5 0 1 1 2.5-2.5L12 8Zm0 0h4.5A2.5 2.5 0 1 0 14 5.5L12 8Z" /></>,
    party: <path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z" fill="currentColor" stroke="none" />,
    send: <><path d="m21 3-7.2 18-3.7-7.1L3 10.2 21 3Z" /><path d="M10.1 13.9 21 3" /></>,
    smile: <><circle cx="12" cy="12" r="9" /><path d="M8 14s1.3 2.5 4 2.5 4-2.5 4-2.5M9 9h.01M15 9h.01" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };

  return <svg {...shared}>{shapes[name]}</svg>;
}

function App() {
  const [followed, setFollowed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [chatDraft, setChatDraft] = useState('');
  const [messages, setMessages] = useState(startingMessages);
  const activeTeam = 'red';
  const [teamTotals, setTeamTotals] = useState({ red: 184, blue: 176 });
  const [donors, setDonors] = useState(initialDonors);
  const [remainingSeconds, setRemainingSeconds] = useState(600);
  const [rewardTarget, setRewardTarget] = useState(450);
  const [rewardUnlocked, setRewardUnlocked] = useState(false);
  const [selectedBits, setSelectedBits] = useState(100);
  const [boostMode, setBoostMode] = useState('subscribe');
  const [cheermotesOpen, setCheermotesOpen] = useState(false);
  const [bitsOpen, setBitsOpen] = useState(false);
  const [giftCount, setGiftCount] = useState(5);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const donorNamesRef = useRef(new Set(initialDonors.map((donor) => donor.name)));
  const rewardTimeoutRef = useRef(null);
  const recordPointsRef = useRef(null);
  const selectedTeam = teams.find((team) => team.id === activeTeam);
  const totalDonations = teamTotals.red + teamTotals.blue;
  const redShare = totalDonations === 0 ? 50 : (teamTotals.red / totalDonations) * 100;
  const redPercent = Math.round(redShare);
  const bluePercent = 100 - redPercent;
  const rewardProgress = totalDonations % 450;
  const pointsToReward = rewardProgress === 0 ? 450 : 450 - rewardProgress;
  const timerText = `${Math.floor(remainingSeconds / 60).toString().padStart(2, '0')}:${(remainingSeconds % 60).toString().padStart(2, '0')}`;
  function sendMessage(event) {
    event.preventDefault();
    const text = chatDraft.trim();
    if (!text) return;

    setMessages((current) => [...current, { user: 'you', color: '#bf94ff', emote: '🎮', text, team: activeTeam }]);
    setChatDraft('');
    setEmojiOpen(false);
  }

  function recordPoints(points, action, emote, user = 'you', teamId = activeTeam) {
    const nextTotal = totalDonations + points;
    const donationTeam = teams.find((team) => team.id === teamId);
    setTeamTotals((current) => ({ ...current, [teamId]: current[teamId] + points }));
    if (!donorNamesRef.current.has(user)) {
      donorNamesRef.current.add(user);
      setRemainingSeconds((current) => current + 30);
    }
    if (nextTotal >= rewardTarget) {
      setRewardTarget((Math.floor(nextTotal / 450) + 1) * 450);
      setRewardUnlocked(true);
      window.clearTimeout(rewardTimeoutRef.current);
      rewardTimeoutRef.current = window.setTimeout(() => setRewardUnlocked(false), 15000);
    }
    setDonors((current) => {
      const donor = current.find((entry) => entry.name === user);
      const next = current.filter((entry) => entry.name !== user);
      next.push({ name: user, amount: (donor?.amount || 0) + points });
      return next.sort((left, right) => right.amount - left.amount).slice(0, 3);
    });
    setMessages((current) => [...current, {
      user,
      color: donationTeam.color,
      emote,
      text: `${action} - ${points.toLocaleString()} POINTS FOR ${donationTeam.name.toUpperCase()} TEAM`,
      team: teamId,
      donation: true,
    }]);
  }

  recordPointsRef.current = recordPoints;

  function cheerWithBits() {
    recordPoints(selectedBits, 'Cheered', '💥');
    setBitsOpen(false);
  }

  function openBoostOptions() {
    setBoostMode(subscribed ? 'cheer' : 'subscribe');
    setBitsOpen(true);
  }

  function subscribeToTeam() {
    if (subscribed) return;
    setSubscribed(true);
    recordPoints(500, 'Subscribed', '🎁');
    setBitsOpen(false);
  }

  function sendDemoGift() {
    recordPoints(
      giftCount * 500,
      `Subscribed (${giftCount} gift ${giftCount === 1 ? 'sub' : 'subs'})`,
      '🎁',
    );
    setBitsOpen(false);
  }

  function sendCheermote(cheermote) {
    setMessages((current) => [...current, {
      user: 'you',
      color: selectedTeam.color,
      emote: '✨',
      text: `cheered ${cheermote}`,
      team: activeTeam,
    }]);
    setCheermotesOpen(false);
  }

  function addEmoji(emoji) {
    setChatDraft((current) => `${current}${emoji}`);
    setEmojiOpen(false);
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const activity = window.setInterval(() => {
      const chatter = simulatedChatters[Math.floor(Math.random() * simulatedChatters.length)];
      if (Math.random() < 0.35) {
        const points = [50, 100, 250][Math.floor(Math.random() * 3)];
        recordPointsRef.current(points, 'Cheered', '💥', chatter.user, chatter.team);
      } else {
        const text = simulatedChatLines[Math.floor(Math.random() * simulatedChatLines.length)];
        setMessages((current) => [...current, {
          user: chatter.user,
          color: chatter.color,
          emote: chatter.emote,
          text,
          team: chatter.team,
        }]);
      }
    }, 6500);
    return () => window.clearInterval(activity);
  }, []);

  useEffect(() => () => window.clearTimeout(rewardTimeoutRef.current), []);

  return (
    <div className="app-shell" style={{ '--team-color': selectedTeam.color }}>
      <main className="viewer-layout" id="stream">
        <section className="stream-column" aria-label="Live stream">
          <div
            className={`player ${playing ? '' : 'player-paused'}`}
            style={{ '--team-color': selectedTeam.color }}
          >
            <div className="player-art" role="img" aria-label="A live chess stream" />
            <div className="player-shade" />
            <div className="player-topline">
              <span className="live-pill"><span />LIVE</span>
              <span className="viewer-pill"><span className="viewer-eye" />12.4K</span>
            </div>
            <div className="player-brand-mark" role="img" aria-label="Twitch">
              <Icon name="twitch" size={14} />
              <span>twitch</span>
            </div>
            <div className="stream-caption">
              <span className="caption-kicker">CHESS · BLITZ</span>
              <strong>speed chess till sunrise</strong>
            </div>
            {!playing && <div className="paused-label">Preview paused</div>}
            <div className="player-controls">
              <button className="player-control" type="button" aria-label={playing ? 'Pause preview' : 'Play preview'} onClick={() => setPlaying((value) => !value)}>
                <Icon name={playing ? 'pause' : 'play'} size={18} />
              </button>
              <div className="player-control-group">
                <button className="player-control" type="button" aria-label={muted ? 'Unmute preview' : 'Mute preview'} aria-pressed={muted} onClick={() => setMuted((value) => !value)}>
                  <Icon name={muted ? 'muted' : 'volume'} size={18} />
                </button>
                <button className="player-control" type="button" aria-label="Expand preview" onClick={() => setNotice('The preview is already sized for this screen')}>
                  <Icon name="expand" size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="team-frame" style={{ '--team-color': selectedTeam.color }}>
          <div className="stream-actions">
            <button className="boost-team-button" type="button" onClick={openBoostOptions}>
              <Icon name="party" size={19} />
              <span>BOOST {selectedTeam.name.toUpperCase()} TEAM</span>
            </button>
            <button className="subscribe-button" type="button" aria-pressed={subscribed} disabled={subscribed} onClick={subscribeToTeam}>
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
            <button className={`follow-button ${followed ? 'is-following' : ''}`} type="button" aria-pressed={followed} onClick={() => setFollowed((value) => !value)}>
              <Icon name="heart" size={15} />{followed ? 'Following' : 'Follow'}
            </button>
          </div>
          <div className={`team-assignment ${rewardUnlocked ? 'is-reward-unlocked' : ''}`} style={{ '--team-color': selectedTeam.color }} aria-live="polite">
            {rewardUnlocked ? (
              <>
                <span className="unlocked-emote" aria-hidden="true">☄️</span>
                <span>You have unlocked a new emote!</span>
                <strong>:CrimsonComet:</strong>
              </>
            ) : (
              <><span />You're on {selectedTeam.name} Team!</>
            )}
          </div>
          <section className="event-scoreboard" aria-label="Red versus Blue team progress">
            <div className="event-scores" aria-live="polite">
              {teams.map((team) => (
                <div className="event-score" key={team.id} style={{ '--team-color': team.color }}>
                  <span>{team.name} Team</span>
                  <strong>{teamTotals[team.id].toLocaleString()} points</strong>
                </div>
              ))}
            </div>
            <div
              className="team-progress"
              role="img"
              aria-label={`Donation progress: Red ${redPercent} percent, Blue ${bluePercent} percent`}
            >
              <span className="progress-red" style={{ width: `${redShare}%` }} />
              <span className="progress-blue" style={{ width: `${100 - redShare}%` }} />
            </div>
            <div className="reward-progress-heading">
              <span>
                Community reward:{' '}
                <span className="reward-emote" role="img" aria-label="Crimson Comet emote">☄️</span> in {pointsToReward} points
              </span>
              <time aria-label="Time remaining">{timerText}</time>
            </div>
            <div
              className="reward-progress"
              role="progressbar"
              aria-label="Points until the next chat reward"
              aria-valuemin={0}
              aria-valuemax={450}
              aria-valuenow={rewardProgress}
            >
              <span style={{ width: `${(rewardProgress / 450) * 100}%` }} />
            </div>
          </section>
          <section className="top-donors" aria-labelledby="top-donors-title">
            <h2 id="top-donors-title">Top Donors</h2>
            <ol>
              {donors.map((donor, index) => (
                <li key={donor.name}>
                  <span className={`donor-rank donor-rank-${index + 1}`}>{index + 1}</span>
                  <strong>{donor.name}</strong>
                  <span>{donor.amount.toLocaleString()} pts</span>
                </li>
              ))}
            </ol>
          </section>
        <aside className="chat-panel" aria-label="Stream chat">
          <div className="message-list" aria-live="polite" aria-label="Chat messages">
            {messages.filter((message) => message.team === activeTeam).map((message, index) => (
              <p className={`chat-message ${message.donation ? 'donation-message' : ''}`} key={`${message.team}-${message.user}-${index}`}>
                <span className="chat-emote" aria-hidden="true">{message.emote}</span>
                <strong style={{ color: message.color }}>{message.user}</strong>
                <span className="message-colon">:</span> {message.text}
              </p>
            ))}
          </div>
          <div className="chat-compose-area">
            {emojiOpen && (
              <div className="emoji-tray" aria-label="Choose an emoji">
                {['💜', '✨', '👏', '🥹', '🔥', '☾'].map((emoji) => (
                  <button key={emoji} type="button" aria-label={`Add ${emoji}`} onClick={() => addEmoji(emoji)}>{emoji}</button>
                ))}
              </div>
            )}
            <form className="chat-form" onSubmit={sendMessage}>
              <label className="sr-only" htmlFor="chat-message">Send a message</label>
              <input id="chat-message" value={chatDraft} onChange={(event) => setChatDraft(event.target.value)} placeholder="Send a message" maxLength={240} />
              <div className="chat-form-actions">
                <button className="compose-icon bits-compose-icon" type="button" aria-label="Open team boost options" onClick={openBoostOptions}>
                  <Icon name="party" size={20} />
                </button>
                <button className="compose-icon" type="button" aria-label={emojiOpen ? 'Close emoji picker' : 'Add emoji'} aria-expanded={emojiOpen} onClick={() => setEmojiOpen((open) => !open)}>
                  <Icon name={emojiOpen ? 'close' : 'smile'} size={19} />
                </button>
                <button className="send-button" type="submit" aria-label="Send message" disabled={!chatDraft.trim()}>
                  <Icon name="send" size={17} />
                </button>
              </div>
            </form>
            <div className="chat-footer"><span>Be respectful to everyone in chat.</span><span>{chatDraft.length}/240</span></div>
          </div>
        </aside>
        </div>
      </main>

      {bitsOpen && (
        <div className="gift-scrim bits-scrim" onClick={() => setBitsOpen(false)}>
          <section className="gift-sheet bits-sheet" role="dialog" aria-modal="true" aria-labelledby="bits-title" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-handle" />
            <header className="gift-sheet-header">
              <span className="gift-sheet-icon"><Icon name="party" size={25} /></span>
              <div><span>SUPPORT THE {selectedTeam.name.toUpperCase()} TEAM</span><h2 id="bits-title">Boost {selectedTeam.name} Team</h2></div>
            </header>
            <p className="gift-description">100 Bits add 100 points to the {selectedTeam.name} Team.</p>
            <div className="boost-modes" role="tablist" aria-label="Choose how to boost the team">
              {[
                ...(!subscribed ? [{ id: 'subscribe', label: 'Subscribe' }] : [{ id: 'gift', label: 'Gift subs' }]),
                { id: 'cheer', label: 'Cheer' },
              ].map((mode) => (
                <button className={boostMode === mode.id ? 'is-active' : ''} key={mode.id} type="button" role="tab" aria-selected={boostMode === mode.id} onClick={() => setBoostMode(mode.id)}>
                  {mode.label}
                </button>
              ))}
            </div>
            {boostMode === 'cheer' && (
              <div className="cheer-options" role="group" aria-label="Choose Bits amount">
              {cheerOptions.map((amount, index) => (
                <button
                  className={`cheer-option ${selectedBits === amount ? 'is-selected' : ''}`}
                  type="button"
                  key={amount}
                  aria-label={`${amount.toLocaleString()} Bits`}
                  aria-pressed={selectedBits === amount}
                  onClick={() => setSelectedBits(amount)}
                >
                  <span className={`cheer-gem cheer-gem-${index}`} aria-hidden="true">◆</span>
                  <strong>{amount.toLocaleString()}</strong>
                  <span>Bits</span>
                </button>
              ))}
            </div>
            )}
            {cheermotesOpen && (
              <div className="cheermote-tray" aria-label="Cheermotes">
                {['✦', '💜', '👏', '🔥'].map((cheermote) => (
                  <button type="button" key={cheermote} aria-label={`Cheer ${cheermote}`} onClick={() => sendCheermote(cheermote)}>{cheermote}</button>
                ))}
              </div>
            )}
            {boostMode === 'gift' && subscribed && (
              <div className="gift-packages boost-gift-options" role="group" aria-label="Choose gift subscription quantity">
                {giftPackages.map((pack) => (
                  <button className={`gift-package ${giftCount === pack.count ? 'is-selected' : ''}`} type="button" key={pack.count} aria-pressed={giftCount === pack.count} onClick={() => setGiftCount(pack.count)}>
                    {pack.badge && <span className="gift-package-badge">{pack.badge}</span>}
                    <span className="gift-package-count">{pack.count} {pack.count === 1 ? 'Sub' : 'Subs'}</span>
                    <strong>{(pack.count * 500).toLocaleString()} points</strong>
                  </button>
                ))}
              </div>
            )}
            {boostMode === 'subscribe' && !subscribed && <p className="boost-points-note">Subscribe for 500 points to the {selectedTeam.name} Team.</p>}
            <div className="cheer-actions">
              {boostMode === 'cheer' && (
                <>
                  <button className="cheermotes-link" type="button" onClick={() => setCheermotesOpen((open) => !open)}>
                    {cheermotesOpen ? 'Hide Cheermotes' : 'Show All Cheermotes'}
                  </button>
                  <button className="cheer-submit" type="button" aria-label={`Cheer ${selectedBits.toLocaleString()} Bits for ${selectedTeam.name} Team`} onClick={cheerWithBits}>
                    <span className="bits-gem">◆</span>Cheer {selectedBits.toLocaleString()} Bits · {selectedBits.toLocaleString()} pts
                  </button>
                </>
              )}
              {boostMode === 'subscribe' && !subscribed && <button className="cheer-submit" type="button" onClick={subscribeToTeam}>Subscribe · 500 points</button>}
              {boostMode === 'gift' && subscribed && <button className="cheer-submit" type="button" onClick={sendDemoGift}>Gift {giftCount} subs · {giftCount * 500} points</button>}
            </div>
            <p className="gift-demo-note">100 Bits = 100 points · subscriptions = 500 points</p>
          </section>
        </div>
      )}

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}

export default App;
