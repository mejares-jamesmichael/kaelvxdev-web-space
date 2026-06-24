<script lang="ts">
  const username = 'mejares-jamesmichael';
  const theme = 'dark';
  const hideBorder = 'true';

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&hide_border=${hideBorder}`;
  const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${theme}&hide_border=${hideBorder}&layout=compact`;
  const streakUrl = `https://streak-stats.demolab.com?user=${username}&theme=${theme}&hide_border=${hideBorder}`;
</script>

<section class="py-20 pointer-events-auto">
  <div class="mb-12">
    <h2 class="section-header">
      <span class="section-number">03.</span>
      <span>GitHub Activity</span>
      <div class="section-divider"></div>
    </h2>
    <p class="section-description">
      // Live stats from my GitHub profile
    </p>
  </div>

  <div class="flex flex-wrap justify-center gap-6">
    <img
      src={statsUrl}
      alt="GitHub Stats"
      class="rounded-sm border border-gray-800"
      loading="lazy"
    />
    <img
      src={langsUrl}
      alt="Top Languages"
      class="rounded-sm border border-gray-800"
      loading="lazy"
    />
    <img
      src={streakUrl}
      alt="GitHub Streak"
      class="rounded-sm border border-gray-800"
      loading="lazy"
    />
  </div>
</section>
