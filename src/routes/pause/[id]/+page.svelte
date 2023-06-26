<script>
	// @ts-nocheck
	import { TempusDominus } from '@eonasdan/tempus-dominus';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	onMount(async () => {
		new TempusDominus(document.getElementById('until'), {
			localization: {
				today: 'Go to today',
				clear: 'Clear selection',
				close: 'Close the picker',
				selectMonth: 'Select Month',
				previousMonth: 'Previous Month',
				nextMonth: 'Next Month',
				selectYear: 'Select Year',
				previousYear: 'Previous Year',
				nextYear: 'Next Year',
				selectDecade: 'Select Decade',
				previousDecade: 'Previous Decade',
				nextDecade: 'Next Decade',
				previousCentury: 'Previous Century',
				nextCentury: 'Next Century',
				pickHour: 'Pick Hour',
				incrementHour: 'Increment Hour',
				decrementHour: 'Decrement Hour',
				pickMinute: 'Pick Minute',
				incrementMinute: 'Increment Minute',
				decrementMinute: 'Decrement Minute',
				pickSecond: 'Pick Second',
				incrementSecond: 'Increment Second',
				decrementSecond: 'Decrement Second',
				toggleMeridiem: 'Toggle Meridiem',
				selectTime: 'Select Time',
				selectDate: 'Select Date',
				dayViewHeaderFormat: { month: 'long', year: '2-digit' },
				locale: 'default',
				startOfTheWeek: 0,
				hourCycle: undefined,
				dateFormats: {
					LTS: 'h:mm:ss T',
					LT: 'h:mm T',
					L: 'MM/dd/yyyy',
					LL: 'MMMM d, yyyy',
					LLL: 'MMMM d, yyyy h:mm T',
					LLLL: 'dddd, MMMM d, yyyy h:mm T'
				},
				ordinal: (n) => n,
				format: 'L'
			},
			display: {
				icons: {
					time: 'bi bi-clock',
					date: 'bi bi-calendar',
					up: 'bi bi-arrow-up',
					down: 'bi bi-arrow-down',
					previous: 'bi bi-chevron-left',
					next: 'bi bi-chevron-right',
					today: 'bi bi-calendar-check',
					clear: 'bi bi-trash',
					close: 'bi bi-x'
				},
				buttons: {
					today: true
				},
				sideBySide: true
			},
			restrictions: {
				minDate: new Date()
			}
		});
	});
</script>

<div class="container half-width">
	{#if data.sub?.id}
		<h3>Pozastavit odběr - {data.sub?.label}</h3>
	{:else}
		<h3>Pozastavit všechny odběry</h3>
	{/if}
	<form method="POST">
		<input type="hidden" id="oldId" name="id" value={data.sub?.id || 'all'} />
		<div class="mb-3">
			<label for="until" class="form-label">Do</label>
			<input id="until" name="until" type="text" class="form-control" required />
		</div>
		<button type="submit" class="btn btn-warning">Pozastavit</button>
	</form>
</div>
