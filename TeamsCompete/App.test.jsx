import { expect, test, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the live stream and chat view', () => {
  render(<App />);
  expect(screen.getByText('LIVE', { selector: '.live-pill' })).toBeDefined();
  expect(screen.getByRole('complementary', { name: 'Stream chat' })).toBeDefined();
  expect(screen.getByRole('button', { name: 'Open team boost options' })).toBeDefined();
  expect(screen.queryByRole('button', { name: 'Gift a Sub from chat' })).toBeNull();
  expect(screen.getByRole('textbox', { name: 'Send a message' }).getAttribute('placeholder')).toBe('Send a message');
  expect(document.querySelector('.streamer-cam')).toBeNull();
  expect(screen.queryByText('LIVE PREVIEW')).toBeNull();
  expect(screen.queryByText('chat picks the next opening')).toBeNull();
  expect(document.querySelectorAll('.chat-emote').length).toBeGreaterThan(5);
  expect(document.querySelectorAll('.message-time')).toHaveLength(0);
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(document.querySelector('.topbar')).toBeNull();
  expect(screen.getByRole('heading', { name: 'Top Donors' })).toBeDefined();
  expect(screen.getAllByRole('listitem')).toHaveLength(3);

  const screenOrder = [...document.querySelectorAll('.player, .stream-actions, .team-assignment, .event-scoreboard, .top-donors, .chat-panel')]
    .map((element) => element.classList[0]);
  expect(screenOrder).toEqual(['player', 'stream-actions', 'team-assignment', 'event-scoreboard', 'top-donors', 'chat-panel']);
  expect(document.querySelector('.team-frame').style.getPropertyValue('--team-color')).toBe('#ed334b');
  expect(document.querySelector('.team-frame').contains(document.querySelector('.player'))).toBe(false);
  const composerActions = [...document.querySelector('.chat-form-actions').children]
    .map((button) => button.getAttribute('aria-label'));
  expect(composerActions).toEqual([
    'Open team boost options',
    'Add emoji',
    'Send message',
  ]);
  expect(document.querySelector('.reward-progress-heading > span').textContent).toContain('Community reward:');
  expect(document.querySelector('.reward-progress-heading > span').textContent).not.toContain('360');
  expect(screen.queryByText('Red Team is leading')).toBeNull();
  expect(screen.getByRole('img', { name: 'Crimson Comet emote' })).toBeDefined();
});

test('opens team boost options without replacing the stream or chat', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Open team boost options' }));
  expect(screen.getByRole('dialog', { name: 'Boost Red Team' })).toBeDefined();
  expect(screen.getByRole('main')).toBeDefined();
  expect(screen.getByRole('complementary', { name: 'Stream chat' })).toBeDefined();
  expect(screen.queryByRole('button', { name: 'Close Bits dialog' })).toBeNull();

  fireEvent.click(document.querySelector('.bits-scrim'));
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(screen.getByRole('complementary', { name: 'Stream chat' })).toBeDefined();
});

test('toggles the local follow state', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /follow/i }));
  expect(screen.getByRole('button', { name: /following/i }).getAttribute('aria-pressed')).toBe('true');
});

test('sends a message into the local chat', () => {
  render(<App />);
  fireEvent.change(screen.getByRole('textbox', { name: 'Send a message' }), { target: { value: 'hello chat' } });
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
  expect(screen.getByText('hello chat')).toBeDefined();
});

test('keeps the default team fixed and applies Bits cheers to its score', () => {
  render(<App />);

  expect(screen.getByText("You're on Red Team!")).toBeDefined();
  expect(screen.queryByRole('tablist')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Open team boost options' }));

  fireEvent.click(screen.getByRole('tab', { name: 'Cheer' }));
  fireEvent.click(screen.getByRole('button', { name: '1,000 Bits' }));
  fireEvent.click(screen.getByRole('button', { name: 'Cheer 1,000 Bits for Red Team' }));

  expect(document.querySelector('.event-score').textContent).toContain('1,184 points');
  expect(screen.getByText('Cheered - 1,000 POINTS FOR RED TEAM')).toBeDefined();
  expect(document.querySelector('.team-frame').style.getPropertyValue('--team-color')).toBe('#ed334b');
});

test('Boost prompts an unsubscribed viewer to subscribe or cheer', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'BOOST RED TEAM' }));
  expect(screen.getByRole('tab', { name: 'Subscribe' }).getAttribute('aria-selected')).toBe('true');
  fireEvent.click(screen.getByRole('tab', { name: 'Cheer' }));
  expect(screen.getByRole('button', { name: 'Cheer 100 Bits for Red Team' })).toBeDefined();
  fireEvent.click(screen.getByRole('tab', { name: 'Subscribe' }));
  expect(screen.getByText('Subscribe for 500 points to the Red Team.')).toBeDefined();
  fireEvent.click(screen.getByRole('button', { name: 'Subscribe · 500 points' }));

  expect(screen.getByText('684 points')).toBeDefined();
  expect(screen.getByText('Subscribed - 500 POINTS FOR RED TEAM')).toBeDefined();
  expect(screen.getByRole('button', { name: 'Subscribed' }).disabled).toBe(true);

  fireEvent.click(screen.getByRole('button', { name: 'BOOST RED TEAM' }));
  expect(screen.getByRole('tab', { name: 'Gift subs' })).toBeDefined();
  expect(screen.getByRole('tab', { name: 'Cheer' })).toBeDefined();
  expect(screen.queryByRole('tab', { name: 'Subscribe' })).toBeNull();
});

test('Boost gift mode awards 500 points per gifted sub', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'BOOST RED TEAM' }));
  fireEvent.click(screen.getByRole('button', { name: 'Subscribe · 500 points' }));
  fireEvent.click(screen.getByRole('button', { name: 'BOOST RED TEAM' }));
  fireEvent.click(screen.getByRole('tab', { name: 'Gift subs' }));
  fireEvent.click(screen.getByRole('button', { name: 'Gift 5 subs · 2500 points' }));

  expect(screen.getByText('3,184 points')).toBeDefined();
  expect(screen.getByText('Subscribed (5 gift subs) - 2,500 POINTS FOR RED TEAM')).toBeDefined();
});

test('timer grants new donors time and resets the emote reward meter', () => {
  vi.useFakeTimers();
  render(<App />);

  expect(screen.getByText('10:00')).toBeDefined();
  expect(screen.getByRole('progressbar', { name: 'Points until the next chat reward' }).getAttribute('aria-valuenow')).toBe('360');

  fireEvent.click(screen.getByRole('button', { name: 'BOOST RED TEAM' }));
  fireEvent.click(screen.getByRole('tab', { name: 'Cheer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Cheer 100 Bits for Red Team' }));

  expect(screen.getByText('10:30')).toBeDefined();
  expect(screen.getByText('You have unlocked a new emote!')).toBeDefined();
  expect(screen.getByText(':CrimsonComet:')).toBeDefined();
  expect(document.querySelector('.team-assignment.is-reward-unlocked')).toBeDefined();
  expect(screen.getByRole('progressbar', { name: 'Points until the next chat reward' }).getAttribute('aria-valuenow')).toBe('10');

  act(() => vi.advanceTimersByTime(5000));
  expect(screen.getByText('You have unlocked a new emote!')).toBeDefined();
  act(() => vi.advanceTimersByTime(9999));
  expect(screen.getByText('You have unlocked a new emote!')).toBeDefined();
  act(() => vi.advanceTimersByTime(1));
  expect(screen.getByText("You're on Red Team!")).toBeDefined();
  vi.useRealTimers();
});

test('simulates viewers cheering for their assigned teams', () => {
  vi.useFakeTimers();
  const random = vi.spyOn(Math, 'random').mockReturnValue(0);
  const { unmount } = render(<App />);

  act(() => vi.advanceTimersByTime(6500));

  expect(document.querySelectorAll('.event-score')[1].textContent).toContain('226 points');
  expect(document.querySelector('.event-score').textContent).toContain('184 points');
  expect(screen.getByText('10:24')).toBeDefined();

  unmount();
  random.mockRestore();
  vi.useRealTimers();
});
