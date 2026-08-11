<script lang="ts">
  import { config } from '$lib/config';
</script>

<section id="certifications" class="py-20 pointer-events-auto">
  <div class="mb-12">
    <h2 class="section-header">
      <span class="section-number">03.</span>
      <span>Certifications</span>
      <div class="section-divider"></div>
    </h2>
    <p class="section-description">
      // Verified credentials & industry certifications
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each config.certifications as cert}
      <div
        class="card group cursor-default flex flex-col justify-between hover:-translate-y-0.5 hover:border-gray-700 transition-all duration-200"
      >
        <div class="flex flex-col sm:flex-row items-start gap-6">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-white mb-1 font-mono">
              {cert.name}
            </h3>
            {#if cert.field}
              <p class="text-gray-400 font-mono text-sm mb-4">- {cert.field}</p>
            {/if}

            <div class="space-y-1.5 text-sm font-mono text-gray-500">
              <p><span class="text-gray-400">issuer:</span> {cert.issuer}</p>
              <p>
                <span class="text-gray-400">issued:</span> {cert.issued}
                {#if cert.expires}
                  <span class="text-gray-600">/ expires {cert.expires}</span>
                {:else}
                  <span class="text-green-500/70">/ no expiry</span>
                {/if}
              </p>
            </div>
          </div>

          {#if cert.credlyBadgeId}
            <div class="shrink-0 mx-auto sm:mx-0">
              <iframe
                src={`https://www.credly.com/badges/${cert.credlyBadgeId}/embedded_view`}
                width="150"
                height="270"
                frameborder="0"
                scrolling="no"
                loading="lazy"
                title="{cert.name} badge"
              ></iframe>
            </div>
          {/if}
        </div>

        {#if cert.verifyUrl || cert.certificateUrl}
          <div class="flex flex-wrap gap-3 mt-4">
            {#if cert.verifyUrl}
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="btn inline-block text-white text-xs"
              >
                > verify credential
              </a>
            {/if}
            {#if cert.certificateUrl}
              <a
                href={cert.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="btn inline-block text-white text-xs"
              >
                > view certificate
              </a>
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>
