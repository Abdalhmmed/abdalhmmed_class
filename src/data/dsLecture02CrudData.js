/**
 * Structured 2D Matrix Methods & Main Demo Program Data (Bilingual AR / EN)
 * Keeps Vue components declarative and 100% free of hardcoded raw HTML code blocks
 */

export const matrixMethodsData = [
  {
    id: 'rowsum',
    icon: 'fa-solid fa-table-list',
    iconColor: 'var(--primary)',
    badgeVariant: 'acc',
    title: {
      ar: '1. دالة طباعة المصفوفة وحساب مجموع كل صف (Print & Sum Rows)',
      en: '1. Print Matrix & Compute Each Row Sum'
    },
    complexityLabel: {
      ar: 'التعقيد الزمني: O(R×C)',
      en: 'Time Complexity: O(R×C)'
    },
    desc: {
      ar: 'تستقبل مصفوفة ثنائية الأبعاد m وتمر على كل صف عبر حلقتين متداخلتين، فتطبع عناصر الصف متبوعة بمجموعه الكلي:',
      en: 'Accepts a 2D matrix m and traverses each row via nested loops, printing row elements followed by the row sum:'
    },
    code: {
      ar: [
        '// دالة لطباعة المصفوفة الثنائية وحساب مجموع كل صف على حدة',
        'public static void printAndSumRows(int[][] m) {',
        '    for (int r = 0; r < m.length; r++) {',
        '        int rowSum = 0; // تصفير المجموع مع بداية كل صف جديد',
        '        System.out.print("Row " + r + ": [ ");',
        '',
        '        for (int c = 0; c < m[r].length; c++) {',
        '            System.out.print(m[r][c] + " ");',
        '            rowSum += m[r][c]; // تراكم قيم عناصر الصف r',
        '        }',
        '',
        '        System.out.println("] -> Sum = " + rowSum);',
        '    }',
        '}'
      ],
      en: [
        '// Method to print the 2D matrix and compute each row sum independently',
        'public static void printAndSumRows(int[][] m) {',
        '    for (int r = 0; r < m.length; r++) {',
        '        int rowSum = 0; // Reset accumulator at the start of each row',
        '        System.out.print("Row " + r + ": [ ");',
        '',
        '        for (int c = 0; c < m[r].length; c++) {',
        '            System.out.print(m[r][c] + " ");',
        '            rowSum += m[r][c]; // Accumulate elements of row r',
        '        }',
        '',
        '        System.out.println("] -> Sum = " + rowSum);',
        '    }',
        '}'
      ]
    }
  },
  {
    id: 'search2d',
    icon: 'fa-solid fa-magnifying-glass',
    iconColor: 'var(--primary)',
    badgeVariant: 'acc',
    title: {
      ar: '2. دالة البحث عن قيمة وإرجاع إحداثياتها (Search 2D Matrix)',
      en: '2. Search 2D Matrix & Return Coordinates'
    },
    complexityLabel: {
      ar: 'التعقيد الزمني: O(R×C)',
      en: 'Time Complexity: O(R×C)'
    },
    desc: {
      ar: 'تبحث عن القيمة target في المصفوفة الثنائية؛ وتُرجع مصفوفة صغيرة من خانتين {r, c} تمثل موقع الصف والعمود فور العثور عليها، أو {-1, -1} عند عدم وجودها:',
      en: 'Searches for target in the 2D matrix and returns a 2-element array {r, c} with the row and column coordinates, or {-1, -1} if absent:'
    },
    code: {
      ar: [
        '// دالة تبحث عن عنصر وتُرجع إحداثياته (الصف، العمود) في مصفوفة بحجم 2',
        'public static int[] search2D(int[][] m, int target) {',
        '    for (int r = 0; r < m.length; r++) {',
        '        for (int c = 0; c < m[r].length; c++) {',
        '            if (m[r][c] == target) {',
        '                return new int[]{r, c}; // تم العثور عليه: إرجاع الإحداثيات فوراً',
        '            }',
        '        }',
        '    }',
        '    return new int[]{-1, -1}; // القيمة غير موجودة في كامل الشبكة',
        '}'
      ],
      en: [
        '// Method to search for target and return {row, col} coordinates',
        'public static int[] search2D(int[][] m, int target) {',
        '    for (int r = 0; r < m.length; r++) {',
        '        for (int c = 0; c < m[r].length; c++) {',
        '            if (m[r][c] == target) {',
        '                return new int[]{r, c}; // Found: return coordinates immediately',
        '            }',
        '        }',
        '    }',
        '    return new int[]{-1, -1}; // Target not found in the matrix',
        '}'
      ]
    }
  },
  {
    id: 'transpose',
    icon: 'fa-solid fa-retweet',
    iconColor: 'var(--primary)',
    badgeVariant: 'ok',
    title: {
      ar: '3. دالة تدوير المصفوفة المربعة في مكانها (In-Place Transpose)',
      en: '3. In-Place Matrix Transpose (Square N×N)'
    },
    complexityLabel: {
      ar: 'الزمن: O(N²) · المكان: O(1)',
      en: 'Time: O(N²) · Space: O(1)'
    },
    desc: {
      ar: 'تقلب الصفوف أعمدة والأعمدة صفوفاً في نفس المصفوفة بدون حجز مصفوفة إضافية، وذلك بالمرور على المثلث العلوي فقط (c = r + 1) وتبديل m[r][c] مع m[c][r]:',
      en: 'Flips rows into columns in-place with O(1) extra space by iterating strictly over the upper triangle (c = r + 1) and swapping m[r][c] with m[c][r]:'
    },
    code: {
      ar: [
        '// دالة لتحويل الصفوف إلى أعمدة في نفس المصفوفة المربعة N×N',
        'public static void transposeInPlace(int[][] m) {',
        '    int n = m.length;',
        '    for (int r = 0; r < n; r++) {',
        '        // نبدأ من c = r + 1 لتبديل المثلث العلوي مع السفلي مرة واحدة فقط',
        '        for (int c = r + 1; c < n; c++) {',
        '            int temp = m[r][c];',
        '            m[r][c] = m[c][r];',
        '            m[c][r] = temp;',
        '        }',
        '    }',
        '}'
      ],
      en: [
        '// Method to transpose an N×N square matrix in-place without extra memory',
        'public static void transposeInPlace(int[][] m) {',
        '    int n = m.length;',
        '    for (int r = 0; r < n; r++) {',
        '        // Start at c = r + 1 to swap upper triangle with lower triangle once',
        '        for (int c = r + 1; c < n; c++) {',
        '            int temp = m[r][c];',
        '            m[r][c] = m[c][r];',
        '            m[c][r] = temp;',
        '        }',
        '    }',
        '}'
      ]
    }
  },
  {
    id: 'diagonals',
    icon: 'fa-solid fa-xmark',
    iconColor: 'var(--primary)',
    badgeVariant: 'ok',
    title: {
      ar: '4. دالة جمع القطرين الرئيسي والثانوي بحلقة واحدة (Diagonal Sum in O(N))',
      en: '4. Primary & Secondary Diagonal Sum in O(N)'
    },
    complexityLabel: {
      ar: 'التعقيد الزمني: O(N)',
      en: 'Time Complexity: O(N)'
    },
    desc: {
      ar: 'تحسب مجموع القطرين الرئيسي والثانوي لمصفوفة مربعة بحلقة منفردة واحدة O(N) بدلاً من حلقتين، مع عدم تكرار جمع الخلية الوسطى إذا كان البعد N فردياً:',
      en: 'Computes the sum of both primary and secondary diagonals in a single O(N) loop, avoiding double-counting the center cell when N is odd:'
    },
    code: {
      ar: [
        '// دالة لحساب مجموع القطرين الرئيسي والثانوي في زمن خطي O(N)',
        'public static int sumDiagonals(int[][] m) {',
        '    int n = m.length;',
        '    int sum = 0;',
        '    for (int i = 0; i < n; i++) {',
        '        sum += m[i][i]; // القطر الرئيسي (r == c)',
        '        if (i != n - 1 - i) {',
        '            sum += m[i][n - 1 - i]; // القطر الثانوي مع منع تكرار المركز',
        '        }',
        '    }',
        '    return sum;',
        '}'
      ],
      en: [
        '// Method to compute the sum of both diagonals in linear O(N) time',
        'public static int sumDiagonals(int[][] m) {',
        '    int n = m.length;',
        '    int sum = 0;',
        '    for (int i = 0; i < n; i++) {',
        '        sum += m[i][i]; // Primary diagonal (r == c)',
        '        if (i != n - 1 - i) {',
        '            sum += m[i][n - 1 - i]; // Secondary diagonal (avoid center duplicate)',
        '        }',
        '    }',
        '    return sum;',
        '}'
      ]
    }
  }
]

export const matrixMainProgram = {
  ar: [
    'public class MatrixMain {',
    '',
    '    // 1. دالة طباعة المصفوفة ومجموع كل صف — O(R×C)',
    '    public static void printAndSumRows(int[][] m) {',
    '        for (int r = 0; r < m.length; r++) {',
    '            int rowSum = 0;',
    '            System.out.print("Row " + r + ": [ ");',
    '            for (int c = 0; c < m[r].length; c++) {',
    '                System.out.print(m[r][c] + " ");',
    '                rowSum += m[r][c];',
    '            }',
    '            System.out.println("] -> Sum = " + rowSum);',
    '        }',
    '    }',
    '',
    '    // 2. دالة البحث وإرجاع الإحداثيات {r, c} — O(R×C)',
    '    public static int[] search2D(int[][] m, int target) {',
    '        for (int r = 0; r < m.length; r++) {',
    '            for (int c = 0; c < m[r].length; c++) {',
    '                if (m[r][c] == target) return new int[]{r, c};',
    '            }',
    '        }',
    '        return new int[]{-1, -1};',
    '    }',
    '',
    '    // 3. دالة تدوير المصفوفة في مكانها (Transpose) — O(N²)',
    '    public static void transposeInPlace(int[][] m) {',
    '        for (int r = 0; r < m.length; r++) {',
    '            for (int c = r + 1; c < m.length; c++) {',
    '                int tmp = m[r][c];',
    '                m[r][c] = m[c][r];',
    '                m[c][r] = tmp;',
    '            }',
    '        }',
    '    }',
    '',
    '    // 4. دالة جمع القطرين الرئيسي والثانوي — O(N)',
    '    public static int sumDiagonals(int[][] m) {',
    '        int n = m.length, sum = 0;',
    '        for (int i = 0; i < n; i++) {',
    '            sum += m[i][i];',
    '            if (i != n - 1 - i) sum += m[i][n - 1 - i];',
    '        }',
    '        return sum;',
    '    }',
    '',
    '    // البرنامج الرئيسي لتجربة العمليات الأربع بالترتيب:',
    '    public static void main(String[] args) {',
    '        int[][] matrix = {',
    '            {10, 20, 30},',
    '            {40, 50, 60},',
    '            {70, 80, 90}',
    '        };',
    '',
    '        // أ. طباعة المصفوفة وحساب مجموع كل صف:',
    '        printAndSumRows(matrix);',
    '',
    '        // ب. البحث عن العنصر 60:',
    '        int[] pos = search2D(matrix, 60);',
    '        System.out.println("Found 60 at: (" + pos[0] + ", " + pos[1] + ")");',
    '',
    '        // ج. حساب مجموع القطرين الرئيسي والثانوي:',
    '        System.out.println("Diagonals Sum = " + sumDiagonals(matrix));',
    '',
    '        // د. تدوير المصفوفة (Transpose) ثم إعادة طباعتها:',
    '        transposeInPlace(matrix);',
    '        System.out.println("--- After Transpose ---");',
    '        printAndSumRows(matrix);',
    '    }',
    '}'
  ],
  en: [
    'public class MatrixMain {',
    '',
    '    // 1. Print matrix and compute each row sum — O(R×C)',
    '    public static void printAndSumRows(int[][] m) {',
    '        for (int r = 0; r < m.length; r++) {',
    '            int rowSum = 0;',
    '            System.out.print("Row " + r + ": [ ");',
    '            for (int c = 0; c < m[r].length; c++) {',
    '                System.out.print(m[r][c] + " ");',
    '                rowSum += m[r][c];',
    '            }',
    '            System.out.println("] -> Sum = " + rowSum);',
    '        }',
    '    }',
    '',
    '    // 2. Search and return {row, col} coordinates — O(R×C)',
    '    public static int[] search2D(int[][] m, int target) {',
    '        for (int r = 0; r < m.length; r++) {',
    '            for (int c = 0; c < m[r].length; c++) {',
    '                if (m[r][c] == target) return new int[]{r, c};',
    '            }',
    '        }',
    '        return new int[]{-1, -1};',
    '    }',
    '',
    '    // 3. In-place square matrix transpose — O(N²)',
    '    public static void transposeInPlace(int[][] m) {',
    '        for (int r = 0; r < m.length; r++) {',
    '            for (int c = r + 1; c < m.length; c++) {',
    '                int tmp = m[r][c];',
    '                m[r][c] = m[c][r];',
    '                m[c][r] = tmp;',
    '            }',
    '        }',
    '    }',
    '',
    '    // 4. Sum primary and secondary diagonals — O(N)',
    '    public static int sumDiagonals(int[][] m) {',
    '        int n = m.length, sum = 0;',
    '        for (int i = 0; i < n; i++) {',
    '            sum += m[i][i];',
    '            if (i != n - 1 - i) sum += m[i][n - 1 - i];',
    '        }',
    '        return sum;',
    '    }',
    '',
    '    // Main driver method testing all 4 operations sequentially:',
    '    public static void main(String[] args) {',
    '        int[][] matrix = {',
    '            {10, 20, 30},',
    '            {40, 50, 60},',
    '            {70, 80, 90}',
    '        };',
    '',
    '        // A. Print matrix and row sums:',
    '        printAndSumRows(matrix);',
    '',
    '        // B. Search for value 60:',
    '        int[] pos = search2D(matrix, 60);',
    '        System.out.println("Found 60 at: (" + pos[0] + ", " + pos[1] + ")");',
    '',
    '        // C. Compute sum of both diagonals:',
    '        System.out.println("Diagonals Sum = " + sumDiagonals(matrix));',
    '',
    '        // D. Transpose matrix in-place and print again:',
    '        transposeInPlace(matrix);',
    '        System.out.println("--- After Transpose ---");',
    '        printAndSumRows(matrix);',
    '    }',
    '}'
  ]
}
