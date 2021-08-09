<template>
  <h2 class="card-title" id="whatisit">
    What is <span class="text-success">listenParty</span>?
  </h2>
  <p class="card-text">
    Listen party is a personal project for me. That came to my mind with the
    thought of creating a music streaming (as in listening together with other
    people) platform without any license issues when Twitch streamers started to
    have DMCA issues because of the music they are listening on their streams.
  </p>
  <p class="card-text">
    It is basically a Twitch, but not for streaming games, making art or things
    like that. This is a Twitch for Spotify, you can only use it with a premium
    Spotify account, you create a party and whatever you play on your Spotify
    will be in sync with your listeners. The music itself is never shared
    through this application only its information (track id, progress,
    paused/resumed) etc. is shared.
    <b
      >Only thing the platform is doing is syncing people's spotify clients with
      each other.</b
    >
  </p>
  <p class="card-text">
    Even though I started working on this project as a product that, at least in
    my dreams, could be used by thousands of people at the same time, the need
    for it kind of dissipated. Also I was a little late on the hype train. There
    are a few more of projects like this basically does the samething but
    visually a lot more polished. Even Spotify (the company) right now working
    something similar but somehow <b>much shittier</b> version of this right
    now.
  </p>
  <p class="card-text">
    As a result. The project kind of turned into a learning experience and
    testing grounds for me.
    <b>I am not planning on actively working on it.</b> As its current state,
    even though it does have bugs and problems;
    <b>this is a working product,</b> an MVP if we are to name it.
  </p>
  <h2 class="card-title" id="how">How to use it?</h2>
  <p>Easy.</p>
  <ul>
    <li>
      Login using spotify, using the button on the upper left corner that says
      so.
    </li>
    <li>
      If you are a <b>listener</b>
      <ul>
        <li>
          Either find it on the stream list and click it or type its name to
          stream name input.
        </li>
        <li>Click Listen!</li>
        <li>Enjoy.</li>
      </ul>
    </li>
    <li>
      If you are a <b>streamer</b>
      <ul>
        <li>Find a unique name for your stream. Found it? Cool.</li>
        <li>Type your stream name to stream name input!</li>
        <li>Click Stream!</li>
        <li>Open your official Spotify client</li>
        <li>Start a song and enjoy.</li>
        <li>You can invite your friends using the URL from Copy Url button.</li>
      </ul>
    </li>
    <li>
      There are some chat commands
      <ul>
        <li>
          /dj [listener name] -> Gives the listener to add more DJs and add
          songs to the queue
        </li>
        <li>
          /queue [song uri] -> Adds the song to the Spotify queue, if you have
          the DJ permission
        </li>
      </ul>
    </li>
  </ul>
  <h2 class="card-title" id="whoevenareyou">
    Who are you?
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="card-link text-dark"
      href="https://github.com/shubidubapp/"
    >
      <fai :icon="['fab', 'github']" />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="card-link text-dark"
      href="https://www.linkedin.com/in/yigit-can-ozkan/"
    >
      <fai :icon="['fab', 'linkedin']" />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="card-link text-dark"
      href="https://www.instagram.com/justshubithings/"
    >
      <fai :icon="['fab', 'instagram']" />
    </a>
  </h2>
  <p class="card-text">
    Hi, I am Yiğit Can Özkan. I am a computer engineer from Izmir/Turkey. I have
    grown next to my computer and I still am doing that. I play a lot of
    computer games, watch a lot of Youtube and Twitch, code a lot, read a lot,
    yeah. I mostly choose to work as a backend engineer but I enjoy learning or
    at least hearing about most things technological, as an example; I like to
    hear about new features that come with CSS but nope I won't learn it, I
    don't like it, thx. But I learned how some machine learning algorithms work
    even though I don't use them. So if you have any suggestions (that is
    <b>not</b> about how ugly this application is) tell me. I am open for
    suggestions although I am not guaranteeing that I will be doing it.
  </p>
  <p>
    This was a small little thing I made in my free time. I don't really have
    much public projects or things like that but things you can find, you can
    find on my Github. I don't really use social media much, but I like taking
    photos and sometimes I share them on an Instagram account so I will
    shamelessly plug it here.
  </p>
  <h2 class="card-title" id="whatmagicisthis">How does it work?</h2>
  <p class="card-text">
    First of all I feel the need of saying. Both backend code and frontend code
    will hopefully be opensource at some point. I am not doing that so far just
    because I am too ashamed to publish this monstrosity of thing called "code"
    to public and no other reason. The working princible behind the project is
    pretty simple (you can actually easily watch the network activity and figure
    it out yourself).
  </p>
  <p class="card-text">
    I am using only Spotify OAuth for login/register and I am not actually
    keeping any extra information other than your spotify name and username, a
    link for your profile picture and of course a few tokens for access to your
    playback information and playback client.
  </p>
  <p class="card-text">
    I am mostly using websockets to communicate with the server. When a streamer
    starts streaming a websocket room is created with the name and listeners
    joins it.
  </p>
  <p class="card-text">
    Every few seconds the Streamer app client queries Spotify API to get current
    playback information then it gets forwarded to the listeners via websocket
    backend. On the clients every time Streamer's playback info is received it
    gets compared to their own playback info if there are differences (like
    progress or the song itself) it gets synced. The backend itself never
    fiddles with your spotify clients all it does is being a middleground for
    clients. It is made this way to keep the server traffic minimal, also
    knowing that when you close the browser tab everything will stop immidiately
    is more assuring.
  </p>
  <p class="card-text">
    I should inform you again that this was a test ground for me to learn so I
    am in no way saying that what I did or how I handled this is optimal or
    beautiful. This has been a good opportunity to learn VueJS (which I really
    liked btw)... I got to learn a little bit of frontend development using the
    famous all hyped javascript libraries (previously I have always used Jinja2
    -with Flask- for server side rendering and some basic client JS libraries).
    <br />
    So the tech stack,
  </p>
  <ul class="list-group">
    <b>Frontend:</b>
    <li class="list-group-item">
      <a target="_blank" rel="noopener noreferrer" href="https://v3.vuejs.org/">
        VueJS v3 </a
      >, for web application
    </li>
    <li class="list-group-item">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://getbootstrap.com/"
        >Bootstrap5</a
      >, because I suck at CSS's and other design related things so I can't do
      it myself
    </li>
    <b>Backend:</b>
    <li class="list-group-item">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://flask.palletsprojects.com/en/2.0.x/"
        >Flask</a
      >, for backend
    </li>
    <li class="list-group-item">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/MongoEngine/mongoengine"
        >Mongoengine</a
      >, for MongoDB ODM
    </li>
    <li class="list-group-item">
      <a target="_blank" rel="noopener noreferrer" href="https://redis.io/"
        >Redis</a
      >, for caching and as a message broker
    </li>
    <li class="list-group-item">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.mongodb.com/"
        >MongoDB</a
      >
    </li>
    <li class="list-group-item">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.docker.com/"
        >Docker and Docker-Compose</a
      >
    </li>
    <li class="list-group-item">
      <a target="_blank" rel="noopener noreferrer" href="https://nginx.org/en/"
        >Nginx</a
      >
    </li>
    <li class="list-group-item">
      Hosted on either
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://aws.amazon.com/"
        >AWS</a
      >
      or
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linode.com/"
        >Linode</a
      >
    </li>
  </ul>
</template>
