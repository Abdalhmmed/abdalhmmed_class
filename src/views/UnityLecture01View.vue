<template>
  <div class="lecture-page theme-unity unity-lecture-view">
    <!-- Interactive Drawing Canvas -->
    <DrawingCanvas />

    <!-- Topbar Navigation -->
    <LectureTopBar
      pdf-url="courses/unity-game-dev/lecture-01/print-pdf.html"
      author-name-ar="م. محمد علي"
      author-name-en="Eng. Mohammed Ali"
      author-icon="fa-chalkboard-user"
    />

    <main class="wrap" :class="{ 'big-view': prefs.isBigMode }">
      <!-- HERO CARD -->
      <section class="card hero">
        <div class="sub-lead">
          {{ isEn ? UNITY_META.courseTitleEn : UNITY_META.courseTitle }} · {{ isEn ? UNITY_META.instructorEn : UNITY_META.instructor }}
        </div>
        <h1>{{ isEn ? UNITY_META.heroH1En : UNITY_META.heroH1 }}</h1>
        <p>{{ isEn ? UNITY_META.heroPEn : UNITY_META.heroP }}</p>
        <div class="chips">
          <span><i class="fa-solid fa-chalkboard-user"></i> {{ isEn ? 'Preparation: Eng. Mohammed Ali' : 'إعداد: م. محمد علي' }}</span>
          <span><i class="fa-brands fa-unity"></i> Unity 2D Engine</span>
          <span><i class="fa-solid fa-wand-magic-sparkles"></i> Rule Tile 3×3</span>
          <span><i class="fa-solid fa-film"></i> 2D Animation Clips</span>
          <span><i class="fa-solid fa-certificate"></i> {{ UNITY_META.year }}</span>
        </div>
      </section>

      <!-- TOC Quick Navigation -->
      <section class="card toc-card">
        <div class="toc-header">
          <h3 class="toc-title">
            <i class="fa-solid fa-list-check"></i>
            <span>{{ isEn ? 'Interactive Lab Roadmap & Index' : 'فهرس مراحل الدرس العملي والمحاكيات التفاعلية' }}</span>
          </h3>
          <span class="toc-badge-academic">{{ isEn ? 'Full Curriculum (9 Sections)' : 'المنهج الكامل (9 مراحل)' }}</span>
        </div>
        <div class="toc-grid">
          <a href="#sec-concepts" class="toc-pill" @click.prevent="scrollToSection('sec-concepts')">
            <span class="toc-num">01</span>
            <span>{{ isEn ? 'Conceptual Triad (Grid vs Tilemap vs Tile)' : 'المثلث المفهومي: Grid مقابل Tilemap مقابل Tile' }}</span>
          </a>
          <a href="#sec-import" class="toc-pill" @click.prevent="scrollToSection('sec-import')">
            <span class="toc-num">02</span>
            <span>{{ isEn ? 'Import Settings & Pixel Art Filters' : 'استيراد الصور وضبط PPU وفلاتر Pixel Art' }}</span>
          </a>
          <a href="#sec-tilemap" class="toc-pill" @click.prevent="scrollToSection('sec-tilemap')">
            <span class="toc-num">03</span>
            <span>{{ isEn ? 'Tile Palette & Tilemap Painter Simulator' : 'محاكي لوحة Tile Palette واستوديو رسم العالم' }}</span>
          </a>
          <a href="#sec-ruletile" class="toc-pill" @click.prevent="scrollToSection('sec-ruletile')">
            <span class="toc-num">04</span>
            <span>{{ isEn ? 'Rule Tile 3×3 Matrix Simulator' : 'أتمتة الحواف والزوايا: محاكي قواعد Rule Tile' }}</span>
          </a>
          <a href="#sec-physics" class="toc-pill" @click.prevent="scrollToSection('sec-physics')">
            <span class="toc-num">05</span>
            <span>{{ isEn ? 'Physics Colliders & Sorting Layers' : 'فيزياء التصادمات وترتيب طبقات المشهد (Sorting)' }}</span>
          </a>
          <a href="#sec-animation" class="toc-pill highlight" @click.prevent="scrollToSection('sec-animation')">
            <span class="toc-num">06</span>
            <span>{{ isEn ? '2D Sprite Animation & Unity Dope Sheet' : 'صناعة حركة الـ 2D Sprite Animation ومحاكي نافذة Animation' }}</span>
          </a>
          <a href="#sec-rubric" class="toc-pill" @click.prevent="scrollToSection('sec-rubric')">
            <span class="toc-num">07</span>
            <span>{{ isEn ? 'Final Task & 18-Point Rubric Calculator' : 'المهمة النهائية وحاسبة التقييم المعملي (18 درجة)' }}</span>
          </a>
          <a href="#sec-troubleshoot" class="toc-pill" @click.prevent="scrollToSection('sec-troubleshoot')">
            <span class="toc-num">08</span>
            <span>{{ isEn ? 'Troubleshooting Guide & Immediate Fixes' : 'دليل المشكلات الشائعة والحلول الفورية (Troubleshooting)' }}</span>
          </a>
          <a href="#sec-playbook" class="toc-pill" @click.prevent="scrollToSection('sec-playbook')">
            <span class="toc-num">09</span>
            <span>{{ isEn ? 'Instructor Flashcards & Self-Check Quiz' : 'خطة التدريس، بطاقات المراجعة والاختبار الذاتي' }}</span>
          </a>
        </div>
      </section>

      <!-- 1. CONCEPTUAL TRIAD -->
      <section id="sec-concepts" class="card">
        <h2>
          <i class="fa-solid fa-brain sec-icon"></i>
          <span>{{ isEn ? '1. The Conceptual Triad: Grid vs. Tilemap vs. Tile' : '1. المثلث المفهومي: Grid مقابل Tilemap مقابل Tile' }}</span>
        </h2>
        <p class="lead">
          {{ isEn ? 'Before configuring Unity windows, students must understand the architectural distinction between these 3 elements:' : 'قبل فتح القوائم داخل محرك Unity، يجب أن يدرك الطالب الفرق الجوهري بين هذه الكيانات الثلاثة:' }}
        </p>

        <div class="grid g3">
          <div class="concept-card">
            <span class="tag-badge">{{ isEn ? 'Mathematical Coordinate' : 'الهيكل الرياضي' }}</span>
            <h4>Grid (الشبكة)</h4>
            <p>{{ isEn ? 'The parent GameObject defining cell dimensions and the snapping coordinate system.' : 'هو الكائن الحاوي الأب (Parent GameObject) الذي يحدد أبعاد الخلايا ونظام الإحداثيات الرياضي لمواقع القطع.' }}</p>
            <div class="analogy-pill"><i class="fa-solid fa-lightbulb"></i> {{ isEn ? 'Analogy: Graph paper' : 'التشبيه: دفتر المربعات الهندسي' }}</div>
          </div>

          <div class="concept-card">
            <span class="tag-badge">{{ isEn ? 'Layer & Surface Canvas' : 'الطبقة والسطح' }}</span>
            <h4>Tilemap (خريطة القطع)</h4>
            <p>{{ isEn ? 'The surface child layer where specific visual types (Ground, Props, Sky) are painted and colliders are attached.' : 'هي الطبقة التابعة لـ Grid التي نحدد فيها نوع السطح (أرضية، زينة، خلفية) وعليها يتم تطبيق التصادمات والرسم.' }}</p>
            <div class="analogy-pill"><i class="fa-solid fa-lightbulb"></i> {{ isEn ? 'Analogy: Transparent drawing layer' : 'التشبيه: الصفحة الشفافة التي نرسم عليها' }}</div>
          </div>

          <div class="concept-card">
            <span class="tag-badge">{{ isEn ? 'Graphic Building Block' : 'الوحدة الرسومية' }}</span>
            <h4>Tile (القطعة)</h4>
            <p>{{ isEn ? 'The square/rectangular asset slice derived from a Sprite, stamped into a specific cell.' : 'هي الرسمة المربعة أو المستطيلة المشتقة من Sprite، التي نضعها داخل خلية معينة في الـ Tilemap.' }}</p>
            <div class="analogy-pill"><i class="fa-solid fa-lightbulb"></i> {{ isEn ? 'Analogy: Individual stamp on cell' : 'التشبيه: الختم أو الرسمة داخل المربع الواحد' }}</div>
          </div>
        </div>

        <div class="teacher-callout">
          <i class="fa-solid fa-quote-right"></i>
          <div>
            <b>{{ isEn ? 'Instructor Note (Eng. Mohammed Ali):' : 'توجيه الأستاذ محمد علي للطلاب:' }}</b><br>
            <span>{{ isEn ? '"Never paint all game elements on a single Tilemap! Separate solid ground into Ground_Tilemap, plants and props into Decoration_Tilemap, and mountains into Background_Tilemap. This separation is vital for Sorting Layers and physics colliders."' : '«تذكروا دائماً: لا ترسموا كل عناصر اللعبة في Tilemap واحدة! افصلوا الأرضية الصلبة في Ground_Tilemap، والنباتات والزينة في Decoration_Tilemap، والسماء والجبال في Background_Tilemap، لأن هذا التنظيم هو المفتاح لضبط طبقات الرؤية (Sorting Layers) ومنع التداخل في التصادمات الفيزيائية.»' }}</span>
          </div>
        </div>
      </section>

      <!-- 2. IMPORT SETTINGS & PIXEL ART -->
      <section id="sec-import" class="card">
        <h2>
          <i class="fa-solid fa-images sec-icon"></i>
          <span>{{ isEn ? '2. Image Import Settings, PPU & Pixel Art Configuration' : '2. استيراد الصور وضبط PPU وفلاتر Pixel Art' }}</span>
        </h2>
        <p class="lead">
          {{ isEn ? 'Before placing textures on palettes, configure the Inspector to prevent blur and scaling distortions:' : 'قبل وضع أي رسمة في اللوحة، يجب مراجعة نافذة Inspector لضبط إعدادات الصورة لتفادي التشوه والضبابية الشائعة في معمل الحاسوب:' }}
        </p>

        <!-- Showcase Cards of Generated Assets -->
        <div class="assets-showcase-box">
          <h4 class="showcase-title">
            <i class="fa-solid fa-cubes"></i>
            <span>{{ isEn ? 'Lab Pixel Art Tile Assets (Unified PPU: 16)' : 'عينات البلاط الرسومي المولدة للمعمل (Generated Pixel Art Tiles)' }}</span>
          </h4>
          <div class="assets-cards-grid">
            <div class="asset-tile-card">
              <img :src="grassTileUrl" alt="Grass Tile" class="asset-img border-green">
              <h5>{{ isEn ? 'Grass Tile' : 'بلاطة العشب (Grass Tile)' }}</h5>
              <span class="mono-tag">grass_tile.jpg · PPU: 16</span>
            </div>
            <div class="asset-tile-card">
              <img :src="dirtTileUrl" alt="Dirt Tile" class="asset-img border-amber">
              <h5>{{ isEn ? 'Dirt Tile' : 'بلاطة التراب (Dirt Tile)' }}</h5>
              <span class="mono-tag">dirt_tile.jpg · PPU: 16</span>
            </div>
            <div class="asset-tile-card">
              <img :src="stoneTileUrl" alt="Stone Tile" class="asset-img border-slate">
              <h5>{{ isEn ? 'Stone Tile' : 'بلاطة الصخر (Stone Tile)' }}</h5>
              <span class="mono-tag">stone_tile.jpg · PPU: 16</span>
            </div>
          </div>
        </div>

        <div class="table-container">
          <table class="standard-table">
            <thead>
              <tr>
                <th style="width:25%;">{{ isEn ? 'Inspector Property' : 'الخاصية في Inspector' }}</th>
                <th style="width:30%;">{{ isEn ? 'Recommended Value' : 'القيمة الموصى بها' }}</th>
                <th style="width:45%;">{{ isEn ? 'Technical Impact & Why' : 'التأثير والسبب العملي' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Texture Type</b></td>
                <td><code>Sprite (2D and UI)</code></td>
                <td>{{ isEn ? 'Converts standard raster images into 2D sprite graphic assets recognized by Unity.' : 'يحوّل ملف الصورة العادي إلى أصل رسومي يفهمه محرك 2D في Unity.' }}</td>
              </tr>
              <tr>
                <td><b>Sprite Mode</b></td>
                <td><code>Single</code> / <code>Multiple</code></td>
                <td>{{ isEn ? 'Use Multiple when the image contains a grid of frames (Sprite Sheet) that must be sliced in Sprite Editor.' : 'نستخدم Multiple إذا كانت الصورة تحتوي شبكة إطارات (Sprite Sheet) تحتاج لتقطيع (Slice).' }}</td>
              </tr>
              <tr>
                <td><b>Pixels Per Unit (PPU)</b></td>
                <td><b>16</b> {{ isEn ? 'or' : 'أو' }} <b>32</b> {{ isEn ? '(Unified)' : '(موحدة للكل)' }}</td>
                <td>{{ isEn ? 'Number of image pixels mapping to 1 Unity World Unit. Unifying it guarantees proportional world scale.' : 'عدد بكسلات الصورة التي تعادل وحدة عالمية واحدة (1 Unit). توحيدها يضمن عدم ظهور عشب ضخم بجانب شجرة قزمة!' }}</td>
              </tr>
              <tr>
                <td><b>Filter Mode</b></td>
                <td><code>Point (no filter)</code></td>
                <td>{{ isEn ? 'Vital for Pixel Art to eliminate bilinear blur and preserve crisp, razor-sharp edges.' : 'ضروري جداً لرسومات Pixel Art لمنع ظهور البلور وضبابية الحواف والحفاظ على حدة البكسلات.' }}</td>
              </tr>
              <tr>
                <td><b>Compression</b></td>
                <td><code>None</code></td>
                <td>{{ isEn ? 'Prevents compression artifact smudging across pixel color palettes.' : 'يمنع الضغط الذي قد يسبب تلطيخاً في ألوان البيكسل.' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="tip-callout">
          <i class="fa-solid fa-lightbulb"></i>
          <div>
            <b>{{ isEn ? 'Pro Tip for (Sprite Slicing):' : 'نصيحة تقطيع الصور (Sprite Slicing):' }}</b><br>
            <span>{{ isEn ? 'When a Sprite Sheet is arranged in uniform cells, choose Grid By Cell Size in Sprite Editor, enter cell dimensions (e.g. 16×16 or 32×32), click Slice, and finish by clicking Apply.' : 'إذا كانت الـ Sprite Sheet مقسمة إلى خلايا متساوية، استخدم Grid By Cell Size في نافذة Sprite Editor، واكتب مقاس الخلية (مثلاً 16×16 أو 32×32) ثم اضغط Slice واختم بـ Apply.' }}</span>
          </div>
        </div>
      </section>

      <!-- 3. TILEMAP PAINTER SIMULATOR -->
      <section id="sec-tilemap" class="card">
        <h2>
          <i class="fa-solid fa-brush sec-icon"></i>
          <span>{{ isEn ? '3. Tile Palette & Interactive Tilemap Painter Simulator' : '3. محاكي لوحة Tile Palette والرسم بالأصول المولدة' }}</span>
        </h2>
        <p class="lead">
          {{ isEn ? 'The Tile Palette window lets you pick tiles and use painting tools (Brush, Box Fill, Eraser) to build levels rapidly:' : 'تتيح لك لوحة Tile Palette اختيار القطع واستخدام أدوات الرسم (الفرشاة، الممحاة، الملء المستطيل) لبناء المرحلة بسرعة بدلاً من وضع كل Sprite كـ GameObject مستقل:' }}
        </p>
        <TilemapPainterSimulator :is-en="isEn" @notify="showToast" />
      </section>

      <!-- 4. RULE TILE SIMULATOR -->
      <section id="sec-ruletile" class="card">
        <h2>
          <i class="fa-solid fa-wand-magic-sparkles sec-icon"></i>
          <span>{{ isEn ? '4. Automating Edges & Corners: Interactive Rule Tile Simulator' : '4. أتمتة الحواف والزوايا: محاكي قواعد Rule Tile التفاعلي' }}</span>
        </h2>
        <p class="lead">
          {{ isEn ? 'Rule Tile inspects the 8 neighboring cells and automatically selects the matching sprite (top edge, right wall, corner, or inner center) without manual edge swapping:' : 'تقنية Rule Tile تفحص الخلايا الثمانية المجاورة وتختار القطعة المناسبة تلقائياً (حافة علوية، حافة يمنى، زاوية، أو وسط) دون رسم يدوي مجهد:' }}
        </p>
        <RuleTileMatrixSimulator :is-en="isEn" />

        <div class="teacher-callout" style="margin-top:22px;">
          <i class="fa-solid fa-quote-right"></i>
          <div>
            <b>{{ isEn ? 'Golden Rule (Eng. Mohammed Ali):' : 'قاعدة ذهبية للأستاذ محمد علي:' }}</b><br>
            <span>{{ isEn ? '"Rule Tile is a condition matcher executed from top to bottom. If two rules conflict, Unity applies whichever sits higher in the Inspector list. Always put specific corner rules on top and generic center rules at the bottom!"' : '«الـ Rule Tile لا تصنع الرسومات بسحر، بل هي محرك شرطي دقيق (Condition Matcher). إذا تعارضت قاعدتان، فإن القاعدة الموجودة في الأعلى في قائمة Inspector هي التي تنفذ أولاً، لذلك ضع القواعد المحددة والدقيقة في البداية، والقواعد العامة في الأسفل!»' }}</span>
          </div>
        </div>
      </section>

      <!-- 5. PHYSICS COLLIDERS & SORTING LAYERS -->
      <section id="sec-physics" class="card">
        <h2>
          <i class="fa-solid fa-shield-halved sec-icon"></i>
          <span>{{ isEn ? '5. Physics Colliders & Sorting Layers Hierarchy' : '5. فيزياء التصادمات وترتيب طبقات المشهد (Sorting Layers)' }}</span>
        </h2>
        <p class="lead">
          {{ isEn ? 'Visual tiles require proper physics components, otherwise the character will plummet through the floor:' : 'مجرد رسم الأرضيات بالـ Tilemap يعطي شكلاً بصرياً فقط، لكن اللاعب سيسقط في الفراغ ما لم نضيف مكوّنات التصادم المناسبة:' }}
        </p>
        <PhysicsColliderSimulator :is-en="isEn" @notify="showToast" />
      </section>

      <!-- 6. 2D SPRITE ANIMATION & UNITY DOPE SHEET SIMULATOR -->
      <section id="sec-animation" class="card">
        <h2>
          <i class="fa-solid fa-film sec-icon"></i>
          <span>{{ isEn ? '6. 2D Sprite Animation Studio & Unity Dope Sheet Simulator' : '6. صناعة حركة الـ 2D Sprite Animation ومحاكي نافذة Animation في Unity' }}</span>
        </h2>
        <p class="lead">
          {{ isEn ? '2D Sprite Animation plays a rapid sequence of sliced sprite frames at a specified sample rate (FPS) to trick the human eye. This interactive studio models Unity\'s Animation Window and Dope Sheet timeline scrubber:' : 'الـ 2D Animation يعتمد على عرض سلسلة من إطارات الـ Sprites المتعاقبة بسرعة محددة (Samples) لخداع العين وتوليد حركة انسيابية. تم تطوير هذا المحاكي ليحاكي نافذة Animation وخط الـ Dope Sheet الزمني المعتمد في محرك Unity:' }}
        </p>
        <AnimationStudioSimulator :is-en="isEn" @notify="showToast" />
      </section>

      <!-- 7. LAB TASK & 18-POINT RUBRIC -->
      <section id="sec-rubric" class="card">
        <h2>
          <i class="fa-solid fa-clipboard-check sec-icon"></i>
          <span>{{ isEn ? '7. Final Lab Task & Interactive Grading Rubric (18 Points)' : '7. المهمة النهائية وحاسبة التقييم المعملي (18 درجة)' }}</span>
        </h2>
        <p class="lead">
          {{ isEn ? 'Track and verify each laboratory requirement to calculate your earned score:' : 'تتبع عناصر التقييم المطلوبة لمعرفة درجتك المستحقة مباشرة:' }}
        </p>
        <GradingRubricCalculator :is-en="isEn" />
      </section>

      <!-- 8. TROUBLESHOOTING GUIDE -->
      <section id="sec-troubleshoot" class="card">
        <h2>
          <i class="fa-solid fa-wrench sec-icon"></i>
          <span>{{ isEn ? '8. Common Unity 2D Issues & Troubleshooting Table' : '8. دليل المشكلات الشائعة والحلول الفورية (Troubleshooting)' }}</span>
        </h2>
        <div class="search-box-row">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            :placeholder="isEn ? 'Search common issues (e.g., blurry, collider, animation, slice, Rule Tile)...' : 'ابحث عن المشكلة فورياً (مثال: ضبابية، تصادم، انيميشن، تقطيع، Rule Tile)...'"
          >
        </div>

        <div class="table-container">
          <table class="trouble-table">
            <thead>
              <tr>
                <th style="width:26%;">{{ isEn ? 'Common Issue in Lab' : 'المشكلة الشائعة' }}</th>
                <th style="width:34%;">{{ isEn ? 'Root Cause in Unity' : 'السبب المحتمل في Unity' }}</th>
                <th style="width:40%;">{{ isEn ? 'Immediate Fix' : 'الحل العملي الفوري' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in filteredTroubleshooting" :key="idx">
                <td><b>{{ isEn ? item.issueEn : item.issue }}</b></td>
                <td>{{ isEn ? item.causeEn : item.cause }}</td>
                <td>{{ isEn ? item.fixEn : item.fix }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 9. FLASHCARDS & QUIZ -->
      <section id="sec-playbook" class="card">
        <h2>
          <i class="fa-solid fa-graduation-cap sec-icon"></i>
          <span>{{ isEn ? '9. Instructor Lab Playbook, Flashcards & Self-Check Quiz' : '9. خطة التدريس المعملية، بطاقات المراجعة والاختبار الذاتي' }}</span>
        </h2>
        <p class="lead">
          {{ isEn ? 'Test your technical readiness before working inside the Unity Editor:' : 'اختبر جاهزيتك واستيعابك الفني قبل فتح القوائم في محرك Unity:' }}
        </p>

        <h3 class="section-subtitle">
          <i class="fa-solid fa-layer-group"></i>
          <span>{{ isEn ? 'Interactive Self-Check Flashcards:' : 'بطاقات الفحص السريع التفاعلية:' }}</span>
        </h3>
        <InteractiveFlashcard
          v-for="(fc, idx) in UNITY_FLASHCARDS"
          :key="idx"
          :question="fc.question"
          :question-en="fc.questionEn"
          :answer="fc.answer"
          :answer-en="fc.answerEn"
          :icon-color="fc.iconColor"
          :is-en="isEn"
        />

        <SelfCheckQuizWidget
          :title="isEn ? 'Unity 2D Lab Interactive Self-Check Quiz' : 'اختبار الفحص المعملي الذاتي لمختبر Unity 2D'"
          :title-en="'Unity 2D Lab Interactive Self-Check Quiz'"
          :questions="UNITY_QUIZ_QUESTIONS"
          :is-en="isEn"
          @quiz-completed="onQuizCompleted"
        />
      </section>

      <!-- ACADEMIC FOOTER -->
      <footer class="academic-footer">
        <p>
          <b>{{ isEn ? 'Programming Lectures & Laboratories Portal' : 'بوابة الملازم والمختبرات البرمجية' }}</b> ({{ isEn ? 'University of Aden' : 'جامعة عدن' }}) · {{ isEn ? 'Unity 2D Game Development Course' : 'مقرر تطوير الألعاب بـ Unity 2D' }}<br>
          {{ isEn ? 'Course Instructor: ' : 'أستاذ المقرر ومعد المحتوى: ' }}<b>{{ isEn ? 'Eng. Mohammed Ali' : 'م. محمد علي' }}</b> · {{ UNITY_META.year }}<br>
          {{ isEn ? 'All Academic, Intellectual, Design & Software Rights Reserved ©' : 'جميع حقوق الموقع والتصميم والمحتوى الأكاديمي والبرمجي محفوظة ©' }}
        </p>
      </footer>
    </main>

    <!-- Floating Back to Top Button -->
    <FloatingBackTop :is-en="isEn" />

    <!-- Toast Notification -->
    <div class="toast" :class="{ show: toast.show }">
      <i class="fa-solid fa-circle-check"></i>
      <span>{{ toast.msg }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import DrawingCanvas from '@/components/lecture/layout/DrawingCanvas.vue'
import LectureTopBar from '@/components/lecture/layout/LectureTopBar.vue'
import grassTileUrl from '@/../assets/grass_tile.jpg'
import dirtTileUrl from '@/../assets/dirt_tile.jpg'
import stoneTileUrl from '@/../assets/stone_tile.jpg'
import {
  UNITY_META,
  UNITY_FLASHCARDS,
  UNITY_QUIZ_QUESTIONS,
  UNITY_TROUBLESHOOTING
} from '@/data/unityLecture01Data.js'

import InteractiveFlashcard from '@/components/common/InteractiveFlashcard.vue'
import SelfCheckQuizWidget from '@/components/common/SelfCheckQuizWidget.vue'
import FloatingBackTop from '@/components/common/FloatingBackTop.vue'
import RuleTileMatrixSimulator from '@/components/lecture/labs/RuleTileMatrixSimulator.vue'
import GradingRubricCalculator from '@/components/lecture/labs/GradingRubricCalculator.vue'
import TilemapPainterSimulator from '@/components/lecture/labs/TilemapPainterSimulator.vue'
import PhysicsColliderSimulator from '@/components/lecture/labs/PhysicsColliderSimulator.vue'
import AnimationStudioSimulator from '@/components/lecture/labs/AnimationStudioSimulator.vue'

const prefs = usePreferencesStore()
const isEn = computed(() => prefs.isEn)
const searchQuery = ref('')

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const toast = reactive({
  show: false,
  msg: ''
})
let toastTimer = null

function showToast(msg) {
  toast.msg = msg
  toast.show = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.show = false
  }, 2600)
}

function onQuizCompleted(res) {
  showToast(prefs.isEn ? `Quiz completed: ${res.totalCorrect} / ${res.totalQuestions}` : `أنهيت الاختبار الذاتي: ${res.totalCorrect} من ${res.totalQuestions}`)
}

const filteredTroubleshooting = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return UNITY_TROUBLESHOOTING
  return UNITY_TROUBLESHOOTING.filter(item => {
    return (
      item.issue.toLowerCase().includes(q) ||
      item.cause.toLowerCase().includes(q) ||
      item.fix.toLowerCase().includes(q) ||
      item.issueEn.toLowerCase().includes(q) ||
      item.causeEn.toLowerCase().includes(q) ||
      item.fixEn.toLowerCase().includes(q)
    )
  })
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})

onUnmounted(() => {
  if (prefs.isDrawing) prefs.toggleDrawing()
})
</script>

<style scoped>
.unity-lecture-view {
  min-height: 100vh;
  overflow-x: hidden;
  max-width: 100%;
  background: var(--bg-page, #fafaf9);
  color: var(--text-main, #1c1917);
  font-family: 'Cairo', system-ui, sans-serif;
  line-height: 1.85;
}

/* Wrapper & Cards */
.wrap {
  max-width: 1160px;
  margin: 0 auto;
  padding: 40px 24px 100px;
  transition: all 0.3s;
}
.wrap.big-view {
  max-width: 1360px;
  font-size: 16px;
}
.card {
  background: var(--surface, var(--paper, #ffffff));
  border: 1.5px solid var(--border, var(--line, #e2e8f0));
  border-radius: var(--radius-lg, 20px);
  box-shadow: var(--shadow-md, 0 10px 25px -5px rgba(217, 119, 6, 0.08));
  padding: 40px 46px;
  margin-bottom: 40px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
@media (max-width: 768px) {
  .wrap { padding: 16px 12px 60px; }
  .card { padding: 22px 18px; margin-bottom: 24px; border-radius: 14px; }
}

/* Hero Section */
.card.hero {
  background: linear-gradient(140deg, #181308 0%, #451a03 52%, #78350f 80%, #b45309 100%);
  color: #fff;
  border: 1.5px solid rgba(245, 158, 11, 0.4);
  position: relative;
  overflow: hidden;
  padding: 50px 52px;
}
[data-theme="dark"] .card.hero {
  background: linear-gradient(140deg, #0c0a06 0%, #2e1002 52%, #451a03 80%, #78350f 100%);
  border-color: rgba(245, 158, 11, 0.3);
}
.sub-lead {
  font-size: 13.5px;
  color: #fef08a;
  font-weight: 800;
  margin-bottom: 8px;
}
.card.hero h1 {
  font-size: 30px;
  margin: 10px 0 16px;
  line-height: 1.45;
  font-weight: 900;
  color: #fff;
}
.card.hero p {
  color: #fef3c7;
  max-width: 890px;
  font-size: 16px;
  line-height: 1.9;
}
.chips {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chips span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px;
  padding: 6px 16px;
  font-size: 12.5px;
  font-weight: 700;
  color: #fef08a;
}

/* TOC Card */
.toc-card {
  padding: 24px 30px;
  background: var(--brand-soft, #fffbeb);
  border-color: var(--brand-border, #fde68a);
}
.toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px dashed var(--brand-border, #fde68a);
}
.toc-title {
  font-size: 16px;
  font-weight: 800;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-main, #1c1917);
}
.toc-title i {
  color: var(--brand, #ea580c);
}
.toc-badge-academic {
  font-size: 11.5px;
  font-weight: 800;
  background: var(--brand-soft, #fff7ed);
  color: var(--brand, #ea580c);
  padding: 3px 12px;
  border-radius: 14px;
  border: 1px solid var(--brand-border, #fed7aa);
}
.toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 10px;
}
.toc-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface, #ffffff);
  border: 1.5px solid var(--border, #fed7aa);
  border-radius: 10px;
  padding: 10px 14px;
  text-decoration: none;
  color: var(--text-main, #1c1917);
  font-size: 13px;
  font-weight: 700;
  transition: all 0.2s;
}
.toc-pill:hover {
  border-color: var(--brand, #ea580c);
  background: var(--brand-soft, #fff7ed);
  transform: translateY(-1px);
}
.toc-pill.highlight {
  border-color: var(--brand, #ea580c);
  box-shadow: 0 2px 8px rgba(234, 88, 12, 0.15);
}
.toc-num {
  font-family: var(--font-mono, monospace);
  font-weight: 800;
  font-size: 12px;
  color: #fff;
  background: var(--brand, #ea580c);
  padding: 2px 8px;
  border-radius: 6px;
}

/* Headings & Texts */
h2 {
  font-size: 22px;
  font-weight: 900;
  color: var(--text-main, #1c1917);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  padding: 0;
}
.sec-icon {
  color: var(--brand, #ea580c);
}
.lead {
  font-size: 15px;
  color: var(--text-muted, #57534e);
  margin-bottom: 24px;
  line-height: 1.8;
}

/* Grids */
.grid.g3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}
@media (max-width: 800px) {
  .grid.g3 {
    grid-template-columns: 1fr;
  }
}

.concept-card {
  background: var(--brand-soft, #fffbeb);
  border: 1.5px solid var(--brand-border, #fde68a);
  border-radius: var(--radius-sm, 12px);
  padding: 22px;
  display: flex;
  flex-direction: column;
}
.tag-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 11px;
  font-weight: 800;
  background: var(--brand-soft, #fff7ed);
  color: var(--brand, #ea580c);
  border: 1px solid var(--brand-border, #fed7aa);
  padding: 2px 10px;
  border-radius: 12px;
  margin-bottom: 10px;
}
.concept-card h4 {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--text-main, #1c1917);
}
.concept-card p {
  font-size: 13.5px;
  color: var(--text-muted, #57534e);
  line-height: 1.7;
  flex-grow: 1;
}
.analogy-pill {
  margin-top: 14px;
  background: var(--surface, #ffffff);
  border: 1px dashed var(--brand-border, #fed7aa);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
  color: var(--brand, #ea580c);
  display: flex;
  align-items: center;
  gap: 6px;
}

.teacher-callout {
  background: var(--brand-soft, #fff7ed);
  border-right: 4px solid var(--brand, #ea580c);
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--text-main, #9a3412);
}
[data-theme="dark"] .teacher-callout {
  color: #ffedd5;
}
.teacher-callout i {
  color: var(--brand, #ea580c);
  font-size: 20px;
  margin-top: 4px;
}
:global(html[dir="ltr"]) .teacher-callout {
  border-right: none !important;
  border-left: 4px solid var(--brand, #ea580c) !important;
}

/* Assets Showcase in Section 2 */
.assets-showcase-box {
  background: var(--brand-soft, #fff7ed);
  border: 1.5px solid var(--brand-border, #fed7aa);
  border-radius: var(--radius-md, 14px);
  padding: 22px;
  margin: 20px 0;
}
.showcase-title {
  font-size: 14.5px;
  font-weight: 800;
  color: var(--brand, #ea580c);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
}
.assets-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.asset-tile-card {
  background: var(--surface, #ffffff);
  border: 1.5px solid var(--border, #fef08a);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.asset-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.border-green { border: 3px solid #22c55e; }
.border-amber { border: 3px solid #92400e; }
.border-slate { border: 3px solid #64748b; }

.asset-tile-card h5 {
  margin: 0 0 4px;
  font-size: 13.5px;
  font-weight: 800;
  color: var(--text-main, #1c1917);
}
.mono-tag {
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  color: var(--text-muted, #57534e);
}

.tip-callout {
  background: var(--brand-soft, #fff7ed);
  border-right: 4px solid var(--brand, #ea580c);
  border-radius: 8px;
  padding: 14px 18px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-main, #9a3412);
  margin-top: 18px;
}
[data-theme="dark"] .tip-callout {
  color: #ffedd5;
}
.tip-callout i {
  color: var(--brand, #ea580c);
  font-size: 18px;
  margin-top: 3px;
}
:global(html[dir="ltr"]) .tip-callout {
  border-right: none !important;
  border-left: 4px solid var(--brand, #ea580c) !important;
}

/* Tables */
.table-container {
  overflow-x: auto;
  margin: 18px 0;
}
.standard-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1.5px solid var(--border, #fed7aa);
  border-radius: var(--radius-sm, 10px);
  overflow: hidden;
  font-size: 13px;
  background: var(--surface, #ffffff);
}
.standard-table th, .standard-table td {
  padding: 12px 16px;
  text-align: right;
  border-bottom: 1px solid var(--border, #fed7aa);
}
.standard-table th {
  background: var(--brand-soft, #fff7ed);
  font-weight: 800;
  color: var(--brand, #ea580c);
}
.standard-table td {
  color: var(--text-main, #1c1917);
}
.standard-table tr:last-child td {
  border-bottom: none;
}
.standard-table tr:hover td {
  background: var(--brand-soft, #fff7ed);
}

/* Troubleshooting Table */
.search-box-row {
  position: relative;
  margin-bottom: 16px;
}
.search-box-row i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 14px;
  color: var(--brand, #ea580c);
  font-size: 14px;
}
.search-input {
  width: 100%;
  padding: 12px 42px 12px 16px;
  border: 1.5px solid var(--border, #fed7aa);
  border-radius: var(--radius-sm, 10px);
  background: var(--surface, #fff7ed);
  font-family: inherit;
  font-size: 13.5px;
  color: var(--text-main, #1c1917);
  box-sizing: border-box;
}
.search-input:focus {
  outline: none;
  border-color: var(--brand, #ea580c);
  background: var(--surface, #ffffff);
}
.trouble-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1.5px solid var(--border, #fed7aa);
  border-radius: var(--radius-sm, 10px);
  overflow: hidden;
  font-size: 13px;
  background: var(--surface, #ffffff);
}
.trouble-table th, .trouble-table td {
  padding: 12px 16px;
  text-align: right;
  border-bottom: 1px solid var(--border, #fed7aa);
}
.trouble-table th {
  background: var(--brand-soft, #fff7ed);
  font-weight: 800;
  color: var(--brand, #ea580c);
}
.trouble-table td {
  color: var(--text-main, #1c1917);
}
.trouble-table tr:last-child td {
  border-bottom: none;
}

/* Section Subtitle */
.section-subtitle {
  font-size: 16px;
  font-weight: 800;
  margin: 24px 0 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-main, #1c1917);
}
.section-subtitle i {
  color: var(--brand, #ea580c);
}

/* Academic Footer */
.academic-footer {
  text-align: center;
  padding: 30px 20px;
  border-top: 2px solid var(--brand-border, #fed7aa);
  color: var(--text-muted, #57534e);
  font-size: 13px;
  line-height: 2;
  margin-top: 40px;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: #0f172a;
  color: #fff;
  border: 1px solid #334155;
  padding: 12px 24px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  z-index: 999;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
.toast i {
  color: #10b981;
}

/* LTR Adjustments for English Mode */
:global(html[dir="ltr"]) .unity-lecture-view .standard-table th,
:global(html[dir="ltr"]) .unity-lecture-view .standard-table td,
:global(html[dir="ltr"]) .unity-lecture-view .trouble-table th,
:global(html[dir="ltr"]) .unity-lecture-view .trouble-table td {
  text-align: left !important;
}

:global(html[dir="ltr"]) .unity-lecture-view h2 {
  border: none !important;
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.unity-lecture-view :deep(.fab-btn) {
  background: var(--brand, #ea580c) !important;
  box-shadow: 0 4px 14px rgba(234, 88, 12, 0.35) !important;
}
.unity-lecture-view :deep(.fab-btn:hover) {
  background: var(--brand-mid, #c2410c) !important;
}
</style>