/**
 * Structured CRUD Methods & Main Demo Program Data (Bilingual AR / EN)
 * Keeps Vue components declarative and 100% free of hardcoded raw HTML code blocks
 */

export const crudMethodsData = [
  {
    id: 'insert',
    icon: 'fa-solid fa-circle-plus',
    iconColor: 'var(--primary)',
    badgeVariant: 'acc',
    title: {
      ar: '1. كود إضافة بيانات (Insert at Position)',
      en: '1. Insert Element at Position'
    },
    complexityLabel: {
      ar: 'التعقيد الزمني: O(n)',
      en: 'Time Complexity: O(n)'
    },
    desc: {
      ar: 'تستقبل المصفوفة القديمة، والموقع pos، والقيمة الجديدة val. تُنشئ مصفوفة جديدة أطول بخانة وتُرجعها بعد إزاحة العناصر لليمين:',
      en: 'Accepts the original array, target position pos, and new value val. Allocates a new array of size n + 1 and returns it after shifting elements right:'
    },
    code: {
      ar: [
        '// دالة لإضافة عنصر في أي موقع محدد داخل المصفوفة',
        'public static int[] insert(int[] arr, int pos, int val) {',
        '    // 1. حجز مصفوفة جديدة أطول بخانة واحدة',
        '    int[] result = new int[arr.length + 1];',
        '',
        '    // 2. نسخ العناصر السابقة لموقع الإضافة كما هي',
        '    for (int i = 0; i < pos; i++) {',
        '        result[i] = arr[i];',
        '    }',
        '',
        '    // 3. وضع القيمة الجديدة في مكانها المخصص',
        '    result[pos] = val;',
        '',
        '    // 4. نسخ العناصر اللاحقة مع إزاحتها لليمين خانة واحدة (+1)',
        '    for (int i = pos; i < arr.length; i++) {',
        '        result[i + 1] = arr[i];',
        '    }',
        '',
        '    return result; // إرجاع المصفوفة الجديدة بعد الإضافة',
        '}'
      ],
      en: [
        '// Method to insert an element at any given position in the array',
        'public static int[] insert(int[] arr, int pos, int val) {',
        '    // 1. Allocate a new array larger by one slot',
        '    int[] result = new int[arr.length + 1];',
        '',
        '    // 2. Copy elements before pos as-is',
        '    for (int i = 0; i < pos; i++) {',
        '        result[i] = arr[i];',
        '    }',
        '',
        '    // 3. Place the new value at its target position',
        '    result[pos] = val;',
        '',
        '    // 4. Copy remaining elements shifted right by one slot (+1)',
        '    for (int i = pos; i < arr.length; i++) {',
        '        result[i + 1] = arr[i];',
        '    }',
        '',
        '    return result; // Return the newly created array',
        '}'
      ]
    }
  },
  {
    id: 'update',
    icon: 'fa-solid fa-pen-to-square',
    iconColor: 'var(--primary)',
    badgeVariant: 'ok',
    title: {
      ar: '2. كود تعديل بيانات (Update at Index)',
      en: '2. Update Element at Index'
    },
    complexityLabel: {
      ar: 'التعقيد الزمني: O(1)',
      en: 'Time Complexity: O(1)'
    },
    desc: {
      ar: 'التعديل لا يتطلب إنشاء مصفوفة جديدة ولا إزاحة؛ نصل للخانة مباشرة عبر الفهرس ونستبدل قيمتها القديمة بالجديدة في خطوة واحدة:',
      en: 'Updating requires no new array or shifting; we jump directly to the index and overwrite its value in O(1):'
    },
    code: {
      ar: [
        '// دالة لتعديل قيمة عنصر في فهرس محدد مباشرة',
        'public static void update(int[] arr, int index, int newVal) {',
        '    // فحص أمان: التأكد أن الفهرس داخل الحدود المسموحة',
        '    if (index >= 0 && index < arr.length) {',
        '        arr[index] = newVal; // استبدال مباشر في خطوة واحدة O(1)',
        '    } else {',
        '        System.out.println("خطأ: الفهرس خارج حدود المصفوفة!");',
        '    }',
        '}'
      ],
      en: [
        '// Method to directly update an element at a specific index',
        'public static void update(int[] arr, int index, int newVal) {',
        '    // Bounds check: ensure index is within valid range',
        '    if (index >= 0 && index < arr.length) {',
        '        arr[index] = newVal; // Direct overwrite in a single step O(1)',
        '    } else {',
        '        System.out.println("Error: Index out of bounds!");',
        '    }',
        '}'
      ]
    }
  },
  {
    id: 'delete',
    icon: 'fa-solid fa-trash-can',
    iconColor: 'var(--bad)',
    badgeVariant: 'acc',
    title: {
      ar: '3. كود حذف بيانات (Delete at Position)',
      en: '3. Delete Element at Position'
    },
    complexityLabel: {
      ar: 'التعقيد الزمني: O(n)',
      en: 'Time Complexity: O(n)'
    },
    desc: {
      ar: 'تستقبل المصفوفة والموقع المراد حذفه pos. تُنشئ مصفوفة جديدة أصغر بخانة، وتنسخ العناصر مع تخطي العنصر المحذوف وإزاحة ما بعده لليسار:',
      en: 'Allocates a new array of size n - 1, copies elements before pos, skips pos, and shifts remaining elements left by -1:'
    },
    code: {
      ar: [
        '// دالة لحذف عنصر في موقع محدد وإرجاع المصفوفة بعد الحذف',
        'public static int[] delete(int[] arr, int pos) {',
        '    // 1. حجز مصفوفة جديدة أصغر بخانة واحدة',
        '    int[] result = new int[arr.length - 1];',
        '',
        '    // 2. نسخ العناصر السابقة لموقع الحذف كما هي',
        '    for (int i = 0; i < pos; i++) {',
        '        result[i] = arr[i];',
        '    }',
        '',
        '    // 3. نسخ العناصر اللاحقة مع إزاحتها لليسار خانة واحدة (-1) لملء الفراغ',
        '    for (int i = pos + 1; i < arr.length; i++) {',
        '        result[i - 1] = arr[i];',
        '    }',
        '',
        '    return result; // إرجاع المصفوفة الجديدة بدون العنصر المحذوف',
        '}'
      ],
      en: [
        '// Method to delete an element at pos and return the new array',
        'public static int[] delete(int[] arr, int pos) {',
        '    // 1. Allocate a new array smaller by one slot',
        '    int[] result = new int[arr.length - 1];',
        '',
        '    // 2. Copy elements before pos as-is',
        '    for (int i = 0; i < pos; i++) {',
        '        result[i] = arr[i];',
        '    }',
        '',
        '    // 3. Copy subsequent elements shifted left by one slot (-1)',
        '    for (int i = pos + 1; i < arr.length; i++) {',
        '        result[i - 1] = arr[i];',
        '    }',
        '',
        '    return result; // Return the new array without the deleted element',
        '}'
      ]
    }
  },
  {
    id: 'search',
    icon: 'fa-solid fa-magnifying-glass',
    iconColor: 'var(--primary)',
    badgeVariant: 'acc',
    title: {
      ar: '4. كود البحث عن بيانات (Linear Search)',
      en: '4. Linear Search'
    },
    complexityLabel: {
      ar: 'التعقيد: أفضل O(1) / أسوأ O(n)',
      en: 'Best O(1) / Worst O(n)'
    },
    desc: {
      ar: 'تبحث عن القيمة target عنصراً عنصراً. إذا وجدتها تُرجع رقم الفهرس index فوراً، وإذا انتهت المصفوفة دون العثور عليها تُرجع -1:',
      en: 'Scans for target element by element. Returns its index immediately if found, or -1 if absent:'
    },
    code: {
      ar: [
        '// دالة للبحث الخطي: تُرجع فهرس العنصر إن وُجد، أو -1 إن لم يوجد',
        'public static int search(int[] arr, int target) {',
        '    for (int i = 0; i < arr.length; i++) {',
        '        if (arr[i] == target) {',
        '            return i; // وُجد العنصر! نرجع الفهرس ونتوقف فوراً',
        '        }',
        '    }',
        '    return -1; // انتهى المرور على كل العناصر ولم نجد القيمة',
        '}'
      ],
      en: [
        '// Linear Search method: returns element index if found, or -1 if absent',
        'public static int search(int[] arr, int target) {',
        '    for (int i = 0; i < arr.length; i++) {',
        '        if (arr[i] == target) {',
        '            return i; // Match found! Return index immediately',
        '        }',
        '    }',
        '    return -1; // Scanned all elements without finding target',
        '}'
      ]
    }
  }
]

export const mainDemoProgram = {
  ar: [
    '/**',
    ' * مختبر هياكل البيانات والخوارزميات بلغة Java',
    ' * إعداد وتطوير: م. عبدالحميد هلال دعبان (بكالوريوس علوم حاسوب)',
    ' * مادة عامة وشاملة لكافة التخصصات الحاسوبية والتقنية',
    ' */',
    'public class Main {',
    '    public static void main(String[] args) {',
    '        int[] numbers = {10, 20, 30, 40};',
    '',
    '        // 1. إضافة 99 في الموقع رقم 1:',
    '        numbers = insert(numbers, 1, 99);   // النتيجة: {10, 99, 20, 30, 40}',
    '',
    '        // 2. تعديل العنصر في الفهرس رقم 0 ليصبح 55:',
    '        update(numbers, 0, 55);             // النتيجة: {55, 99, 20, 30, 40}',
    '',
    '        // 3. حذف العنصر في الموقع رقم 2 (الذي قيمته 20):',
    '        numbers = delete(numbers, 2);       // النتيجة: {55, 99, 30, 40}',
    '',
    '        // 4. البحث عن الرقم 30:',
    '        int found = search(numbers, 30);',
    '        if (found != -1) {',
    '            System.out.println("وُجد في الفهرس: " + found); // يطبع الفهرس 2',
    '        } else {',
    '            System.out.println("غير موجود");',
    '        }',
    '    }',
    '}'
  ],
  en: [
    '/**',
    ' * Data Structures & Algorithms Lab in Java',
    ' * Prepared by: Eng. Abdulhamid Helal Daban (B.Sc. in Computer Science)',
    ' */',
    'public class Main {',
    '    public static void main(String[] args) {',
    '        int[] numbers = {10, 20, 30, 40};',
    '',
    '        // 1. Insert 99 at position 1:',
    '        numbers = insert(numbers, 1, 99);   // Result: {10, 99, 20, 30, 40}',
    '',
    '        // 2. Update element at index 0 to 55:',
    '        update(numbers, 0, 55);             // Result: {55, 99, 20, 30, 40}',
    '',
    '        // 3. Delete element at position 2 (value 20):',
    '        numbers = delete(numbers, 2);       // Result: {55, 99, 30, 40}',
    '',
    '        // 4. Search for value 30:',
    '        int found = search(numbers, 30);',
    '        if (found != -1) {',
    '            System.out.println("Found at index: " + found); // Prints index 2',
    '        } else {',
    '            System.out.println("Not found");',
    '        }',
    '    }',
    '}'
  ]
}
