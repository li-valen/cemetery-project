jQuery(document).ready(function ($) {
	var timelines = $('.cd-horizontal-timeline'),
		eventsMinDistance = 300;

	(timelines.length > 0) && initTimeline(timelines);

	function initTimeline(timelines) {
		timelines.each(function () {
			var timeline = $(this),
				timelineComponents = {};
			// Cache timeline components 
			timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
			timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
			timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
			timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
			timelineComponents['eventsContent'] = timeline.children('.events-content');

			// Assign a left position to the single events along the timeline
			setDatePosition(timelineComponents, eventsMinDistance);
			// Assign a width to the timeline
			var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
			// The timeline has been initialized - show it
			timeline.addClass('loaded');

			// Detect click on the next arrow: jump immediately to the next event.
			timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
				event.preventDefault();
				showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			// Detect click on the prev arrow: jump immediately to the previous event.
			timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
				event.preventDefault();
				showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});
			// Detect click on a single event - show new event content
			timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
				event.preventDefault();
				timelineComponents['timelineEvents'].removeClass('selected');
				$(this).addClass('selected');
				updateOlderEvents($(this));
				updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent($(this), timelineComponents['eventsContent']);
			});

			// On swipe, show next/prev event content
			timelineComponents['eventsContent'].on('swipeleft', function () {
				var mq = checkMQ();
				(mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			timelineComponents['eventsContent'].on('swiperight', function () {
				var mq = checkMQ();
				(mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});

			// Keyboard navigation
			$(document).keyup(function (event) {
				if (event.which == '37' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'prev');
				} else if (event.which == '39' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'next');
				}
			});
		});
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		// Go from one event to the next/previous one
		var visibleContent = timelineComponents['eventsContent'].find('.selected'),
			newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

		if (newContent.length > 0) { // If there's a next/prev event - show it
			var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

			updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth) {
		// Translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));

		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

		if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate)) {
			translateTimeline(timelineComponents, - eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
		}
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; // Only negative translate value
		value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; // Do not translate more than timeline width
		setTransformValue(eventsWrapper, 'translateX', value + 'px');
		// Update navigation arrows visibility
		(value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		// Change .filling-line length according to the selected event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
		var scaleValue = eventLeft / totWidth;
		setTransformValue(filling.get(0), 'scaleX', scaleValue);
	}

	function setDatePosition(timelineComponents, minDistance) {
		var firstDate = timelineComponents['timelineDates'][0];
		var lastDate = timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1];
		var totalDays = daydiff(firstDate, lastDate);

		// Calculate the distance between dots based on available space and date range
		var distanceBetweenDates = minDistance;

		// If dates are very close, use the minimum distance
		if (timelineComponents['eventsMinLapse'] > 0 && timelineComponents['eventsMinLapse'] < minDistance) {
			distanceBetweenDates = minDistance;
		}

		// Add an offset so the first dot is not flush with the left edge
		var offset = minDistance / 2;

		timelineComponents['timelineEvents'].each(function (i) {
			var currentDate = timelineComponents['timelineDates'][i];
			var daysFromStart = daydiff(firstDate, currentDate);

			// Calculate position based on days difference and distance setting
			var leftPosition = offset;

			if (totalDays > 0) {
				// Scale the position if we have multiple dates
				leftPosition += (daysFromStart / totalDays) * (timelineComponents['timelineEvents'].length * distanceBetweenDates);
			} else {
				// If all dates are the same, space them evenly
				leftPosition += i * distanceBetweenDates;
			}

			$(this).css('left', leftPosition + 'px');
		});
	}

	function setTimelineWidth(timelineComponents, minDistance) {
		var timelineEventsCount = timelineComponents['timelineEvents'].length;
		var firstDate = timelineComponents['timelineDates'][0];
		var lastDate = timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1];
		var totalDays = daydiff(firstDate, lastDate);

		// Calculate width based on the number of events and minimum distance
		var baseWidth = timelineEventsCount * minDistance;

		// Add extra padding for the last event and to ensure there's always scrolling room
		var extraPadding = minDistance * 2;
		var totalWidth = Math.max(baseWidth + extraPadding, minDistance * 8);

		timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');

		updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents, totalWidth);

		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
		var eventDate = event.data('date'),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
			selectedContentHeight = selectedContent.height();

		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
		} else {
			var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
		}

		selectedContent.attr('class', classEnetering);
		visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
			visibleContent.removeClass('leave-right leave-left');
			selectedContent.removeClass('enter-left enter-right');
		});
		eventsContent.css('height', selectedContentHeight + 'px');
	}

	function updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
				timelineStyle.getPropertyValue("-moz-transform") ||
				timelineStyle.getPropertyValue("-ms-transform") ||
				timelineStyle.getPropertyValue("-o-transform") ||
				timelineStyle.getPropertyValue("transform");

		if (timelineTranslate.indexOf('(') >= 0) {
			var timelineTranslate = timelineTranslate.split('(')[1];
			timelineTranslate = timelineTranslate.split(')')[0];
			timelineTranslate = timelineTranslate.split(',');
			var translateValue = timelineTranslate[4];
		} else {
			var translateValue = 0;
		}

		return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property + "(" + value + ")";
		element.style["-moz-transform"] = property + "(" + value + ")";
		element.style["-ms-transform"] = property + "(" + value + ")";
		element.style["-o-transform"] = property + "(" + value + ")";
		element.style["transform"] = property + "(" + value + ")";
	}

	function parseDate(events) {
		var dateArrays = [];
		events.each(function () {
			var dateComp = $(this).data('date').split('/'),
				newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
			dateArrays.push(newDate);
		});
		return dateArrays;
	}

	function daydiff(first, second) {
		return Math.round((second - first) / (1000 * 60 * 60 * 24));
	}

	function minLapse(dates) {
		// Determine the minimum distance among events
		var dateDistances = [];
		for (var i = 1; i < dates.length; i++) {
			var distance = daydiff(dates[i - 1], dates[i]);
			if (distance > 0) {
				dateDistances.push(distance);
			}
		}

		if (dateDistances.length > 0) {
			return Math.min.apply(null, dateDistances);
		} else {
			return 0; // If all dates are the same or in wrong order
		}
	}

	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while (el.offsetParent) {
			el = el.offsetParent;
			top += el.offsetTop;
			left += el.offsetLeft;
		}

		return (
			top < (window.pageYOffset + window.innerHeight) &&
			left < (window.pageXOffset + window.innerWidth) &&
			(top + height) > window.pageYOffset &&
			(left + width) > window.pageXOffset
		);
	}

	function checkMQ() {
		// Check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
});