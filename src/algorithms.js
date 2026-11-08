export const descriptions = {
  bubble: ['Bubble Sort','O(n²)','O(1)','Repeatedly swaps adjacent elements that are out of order.'],
  selection: ['Selection Sort','O(n²)','O(1)','Selects the smallest remaining element and moves it into position.'],
  insertion: ['Insertion Sort','O(n²)','O(1)','Inserts each element into its correct position in the sorted prefix.'],
  merge: ['Merge Sort','O(n log n)','O(n)','Divides the array and merges sorted halves.'],
  quick: ['Quick Sort','O(n log n) avg.','O(log n) avg.','Partitions elements around a pivot, then recursively sorts partitions.'],
  heap: ['Heap Sort','O(n log n)','O(1)','Builds a max heap and repeatedly extracts the maximum.']
};
export function makeSteps(input, kind) {
  const a = [...input], steps = [];
  const push = (active=[], changed=[], sorted=[]) => steps.push({values:[...a],active:[...active],changed:[...changed],sorted:[...sorted]});
  const swap = (i,j) => { [a[i],a[j]]=[a[j],a[i]]; push([i,j],[i,j]); };
  if(kind==='bubble') { for(let end=a.length-1;end>0;end--) for(let j=0;j<end;j++){push([j,j+1]);if(a[j]>a[j+1])swap(j,j+1);} }
  if(kind==='selection') { for(let i=0;i<a.length;i++){let m=i;for(let j=i+1;j<a.length;j++){push([m,j]);if(a[j]<a[m])m=j;}if(m!==i)swap(i,m);} }
  if(kind==='insertion') { for(let i=1;i<a.length;i++){let j=i;while(j>0){push([j-1,j]);if(a[j-1]<=a[j])break;swap(j-1,j);j--;}} }
  if(kind==='merge') {const sort=(l,r)=>{if(r-l<=1)return;let m=(l+r)>>1;sort(l,m);sort(m,r);let left=a.slice(l,m),right=a.slice(m,r),i=0,j=0,k=l;while(i<left.length||j<right.length){push([k]);a[k++]=j>=right.length||(i<left.length&&left[i]<=right[j])?left[i++]:right[j++];push([],[k-1]);}};sort(0,a.length);}
  if(kind==='quick') {const sort=(lo,hi)=>{if(lo>=hi)return;let pivot=a[hi],i=lo;for(let j=lo;j<hi;j++){push([j,hi]);if(a[j]<pivot){if(i!==j)swap(i,j);i++;}}if(i!==hi)swap(i,hi);sort(lo,i-1);sort(i+1,hi);};sort(0,a.length-1);}
  if(kind==='heap') {const heapify=(n,i)=>{let max=i,l=2*i+1,r=2*i+2;if(l<n){push([max,l]);if(a[l]>a[max])max=l;}if(r<n){push([max,r]);if(a[r]>a[max])max=r;}if(max!==i){swap(i,max);heapify(n,max);}};for(let i=Math.floor(a.length/2)-1;i>=0;i--)heapify(a.length,i);for(let end=a.length-1;end>0;end--){swap(0,end);heapify(end,0);}}
  push([],[],a.map((_,i)=>i));return steps;
}
